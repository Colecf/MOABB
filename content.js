var apiKey = undefined;
analyzeSentiment("I hate google.", function(response) {
  console.log(response);
});

function analyzeSentiment(text, cb) {
  chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

$("*").each(function() {
  var text = $(this).clone().children().remove().end().text();
  if(text.length > 0) {
    //console.log(text);
  }
});

