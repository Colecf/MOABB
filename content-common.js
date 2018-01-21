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
			console.log("censored \"" + obj.text() + "\" with sentiment " + sentiment);
			$(obj).css("filter", "blur(6px)")

		    $(obj).hover(
		    function () {
		        $(obj).css("filter", "blur(0px)")
		    },
		    function () {
		        $(obj).css("filter", "blur(6px)")
		    }
		    );
		}
	})

}
