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




var pagetext = ""
var objarr = []
var ofsarr = []


$("*:visible").each(function() {
  var text = $(this).clone().children().remove().end().text();

  if(text.length > 10 && !isEmptyOrSpaces(text)) {
   // console.log(text);
    ofsarr.push(pagetext.length)
    pagetext += ("\n\n"+text)
    objarr.push($(this))
  }
});

ofsarr.push(ofsarr[ofsarr.length-1]+1)


//console.log(pagetext)
//console.log(objarr)


//console.log(objarr[0].clone().children().remove().end().text())


console.log(objarr.length)
objarr.forEach(function(obj, i){
	text = objarr[i].clone().children().remove().end().text();

	analyzeSentiment(text, function(data){
		censor(objarr[i], data.documentSentiment.score)
//		console.log(data, data.documentSentiment.score)

	})

})



var observer = new MutationObserver(function(list){

	console.log("srdfghfdxgfdgfdhfghgfhfghfghhg")

	list.forEach(function(obj, i){
		//if($(obj).is(':visible')){


			text = $(obj).clone().children().remove().end().text();

			console.log(text)
			analyzeSentiment(text, function(data){
				censor($(obj), data.documentSentiment.score)
		//		console.log(data, data.documentSentiment.score)

			})
		//}
	})
})

var config = {subtree:true, childList: true}

observer.observe(document.body, config)