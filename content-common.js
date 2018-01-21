var ourJ = $.noConflict();

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

function censor(obj, sentiment){
	getCensorRange(function(range){
		if(sentiment <= range[1] && sentiment >= range[0]){

			console.log("CENSORED", obj, obj.clone().children().remove().end().text())

			ourJ(obj).css("filter", "blur(6px)")

		    ourJ(obj).hover(
		    function () {
		        ourJ(obj).css("filter", "blur(0px)")
		    }, 

		    function () {
		        ourJ(obj).css("filter", "blur(6px)")
		    }
		    );
		}
	})

}
