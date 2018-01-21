var apiKey = undefined;
analyzeSentiment("I hate google.", function(response) {
  console.log(response);
  console.log(response.sentences[0].text)
});



function analyzeSentiment(text, cb) {
  chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function censor(obj, sentiment){

	//console.log(sentiment)
	if(sentiment < -0.25){
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
}


var pagetext = ""
var objarr = []
var ofsarr = []


$("*:visible").each(function() {
  var text = $(this).clone().children().remove().end().text();

  if(text.length > 10 && !isEmptyOrSpaces(text)) {
    console.log(text);
    ofsarr.push(pagetext.length)
    pagetext += "\n\n"+text
    objarr.push($(this))
  }
});

ofsarr.push(ofsarr[ofsarr.length-1]+1)


console.log(pagetext)
console.log(objarr)


console.log(objarr[0].clone().children().remove().end().text())

analyzeSentiment(pagetext, function(data){

	console.log(data)

	var sentence_index = 0

	for(var i = 0; i < objarr.length; i++){

		var total_sentiment = 0;
		var total_score = 0;
		var total_magnitude = 0;

		console.log(":::::",objarr[i].clone().children().remove().end().text(), ":::::")		

		while(true) {
			sentence = data.sentences[sentence_index]

			console.log(sentence.text.beginOffset, ofsarr[i+1])

			if(sentence.text.beginOffset >= ofsarr[i+1]){
				break;
			}
			console.log("\t\t\t",sentence.text.content)

			sentence_index++

			total_sentiment += sentence.sentiment.score * sentence.sentiment.magnitude;
			total_magnitude += sentence.sentiment.magnitude;
			total_score += sentence.sentiment.score
			
		}

		if (total_magnitude == 0){
			total_magnitude = 1
		}
		censor(objarr[i], total_sentiment)
	}


})

