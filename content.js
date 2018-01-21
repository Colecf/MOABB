function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}




var pagetext = ""
var objarr = []
var ofsarr = []


ourJ("*:visible").each(function() {
  var text = ourJ(this).clone().children().remove().end().text();

  if(text.length > 10 && !isEmptyOrSpaces(text)) {
   // console.log(text);
    ofsarr.push(pagetext.length)
    pagetext += ("\n\n"+text)
    objarr.push(this)
  }
});

ofsarr.push(ofsarr[ofsarr.length-1]+1)


//console.log(pagetext)
//console.log(objarr)


//console.log(objarr[0].clone().children().remove().end().text())


console.log(objarr.length)

censor_arr(objarr)

function censor_arr(obj_arr){

	obj_arr.forEach(function(obj, i){

		console.log("TSERTHRZETSYSETYDSERYDRSETDYR",obj)

		if(ourJ(obj).is(':visible') || true){
			text = ourJ(obj).clone().children().remove().end().text();

			if(text.length > 3 || true){
				analyzeSentiment(text, function(data){
					censor(ourJ(obj), data.documentSentiment.score)
			//		console.log(data, data.documentSentiment.score)

				})
			}
		}

	})
}


function censor_obj(obj){
	if(ourJ(obj).is(':visible') || true){
			text = ourJ(obj).clone().children().remove().end().text();

			if(text.length > 3 || true){
				analyzeSentiment(text, function(data){
					censor(ourJ(obj), data.documentSentiment.score)
			//		console.log(data, data.documentSentiment.score)

				})
			}
		}
}



var observer = new MutationObserver(function(list){

	console.log(list)


	list.forEach(function(mutrec){

		mutrec.addedNodes.forEach(function(node){

			ourJ(node).find('*').each(function(child){
				censor_obj(child)
			})
		})


		censor_arr(mutrec.addedNodes)

	})
})

var config = {subtree:true, childList: true}

observer.observe(document.body, config)



