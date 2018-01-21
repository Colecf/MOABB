function analyzeSentiment(text, cb) {
  chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}
