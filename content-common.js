function analyzeSentiment(text, cb) {
  chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

function getCensorRange(cb) {
  chrome.runtime.sendMessage({type: "getSetting", which: "low"}, function(low) {
    chrome.runtime.sendMessage({type: "getSetting", which: "high"}, function(high) {
      cb([low, high]);
    });
  });
}
