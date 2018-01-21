$(document).ready(function() {
  $("#score").slider({
    range: true,
    step: 0.1,
    min: -1,
    max: 1,
    change: function(event, ui) {
      chrome.runtime.sendMessage({type: "setSetting", which: "low", value: $("#score").slider("values")[0]});
      chrome.runtime.sendMessage({type: "setSetting", which: "high", value: $("#score").slider("values")[1]});
    }});
  
  chrome.runtime.sendMessage({type: "getSetting", which: "low"}, function(low) {
    chrome.runtime.sendMessage({type: "getSetting", which: "high"}, function(high) {
      $("#score").slider("values", 0, low);
      $("#score").slider("values", 1, high);
    });
  });
});
