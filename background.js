console.log("Loaded");

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4) {
        if(xmlHttp.status == 200) {
          callback(xmlHttp.responseText);
        } else {
          callback({error: xmlHttp.status});
        }
      }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpJSONAsync(url, data, callback, depth) {
  depth = depth || 0;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    console.log(xmlHttp);
    if (xmlHttp.readyState == 4) {
      if(xmlHttp.status == 200) {
        console.log(JSON.parse(xmlHttp.responseText));
        callback(JSON.parse(xmlHttp.responseText));
      } else if(xmlHttp.status == 429 && depth < 5) {
        setTimeout(function() {
          httpJsonAsync(url, data, callback, depth+1);
        }, 200);
      } else {
        callback({error: xmlHttp.status});
      }
    }
  };
  xmlHttp.open("POST", url, true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(JSON.stringify(data));
}

var apiKey = undefined;
httpGetAsync(chrome.extension.getURL('apikey.txt'), function(text) {
  apiKey = text;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.type === "getSetting") {
    chrome.storage.local.get(request.which, function(res) {
      if(!(request.which in res)) {
        if(request.which === "low") {
          res["low"] = -1;
        } else if(request.which === "high") {
          res["high"] = -0.25;
        } else if(request.which === "optimizedWay") {
          res["optimizedWay"] = false;
        }
      }
      sendResponse(res[request.which]);
    });
    return true;
  }
  if(request.type === "setSetting") {
    var toSet = {};
    toSet[request.which] = request.value;
    chrome.storage.local.set(toSet);
  }
  if (request.type === "getapikey")
    sendResponse(apiKey);
  if (request.type === "analyzeSentiment") {
    if(!apiKey) {
      sendResponse({error: "No API key!"});
      return;
    }

    httpJSONAsync('https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key='+apiKey, {
      document: {
        type: "PLAIN_TEXT",
        language: "en",
        content: request.text
      },
      encodingType: "UTF8"
    }, sendResponse);
    return true; // to make it not invalidate sendResponse
  }
  
});


