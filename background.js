console.log("Loaded");

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

var apiKey;
httpGetAsync(chrome.extension.getURL('apikey.txt'), function(text) {
  apiKey = text;
  console.log(apiKey);
});

