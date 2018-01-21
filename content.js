function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

/*
var pagetext = "";
var objarr = [];
var ofsarr = [];

ourJ("*:visible").each(function() {
    var text = ourJ(this).clone().children().remove().end().text();

    if(text.length > 10 && !isEmptyOrSpaces(text)) {
        // console.log(text);
        ofsarr.push(pagetext.length)
        pagetext += ("\n\n"+text)
        objarr.push(this);
    }
});

ofsarr.push(ofsarr[ofsarr.length-1]+1)

*/


//console.log(pagetext)
//console.log(objarr)


//console.log(objarr[0].clone().children().remove().end().text())

/*
console.log(objarr.length);
censor_arr(objarr);

function censor_arr(obj_arr){

    obj_arr.forEach(function(obj, i){

	console.log("TSERTHRZETSYSETYDSERYDRSETDYR",obj);

	if(ourJ(obj).is(':visible')){
	    text = ourJ(obj).clone().children().remove().end().text();

	    if(text.length > 3){
		analyzeSentiment(text, function(data){
		    try{
			censor(ourJ(obj), data.documentSentiment.score);
		    } catch(e) {
			console.log("ERROR:",e,data);
		    }
		    //		console.log(data, data.documentSentiment.score)

		});
	    }
	}
    });
}


function censor_obj(obj){
    if(ourJ(obj).is(':visible')){
	text = ourJ(obj).clone().children().remove().end().text();

	if(text.length > 3){
	    analyzeSentiment(text, function(data){
		censor(ourJ(obj), data.documentSentiment.score)
		//		console.log(data, data.documentSentiment.score)
	    });
	}
    }
}

*/
//censor_page(objarr, pagetext)

redo()


function redo(){

    var pagetext = "";
    var objarr = [];
    var ofsarr = [];

    ourJ("*:visible").each(function() {
	var text = ourJ(this).clone().children().remove().end().text();

	if(text.length > 10 && !isEmptyOrSpaces(text)) {
	    // console.log(text);
	    ofsarr.push(pagetext.length)
	    pagetext += ("\n\n"+text)
	    objarr.push(this);
	}
    });

    ofsarr.push(ofsarr[ofsarr.length-1]+1)

    censor_page(objarr, ofsarr, pagetext)

    //censor_arr(objarr);
}

// in the example above, assign the result
var timeoutHandle; // = window.setTimeout(...);

// in your click function, call clearTimeout


var observer = new MutationObserver(function(list){

    window.clearTimeout(timeoutHandle);

    // then call setTimeout again to reset the timer
    timeoutHandle = window.setTimeout(redo, 750);


    console.log(list);


    /*
     list.forEach(function(mutrec){

     mutrec.addedNodes.forEach(function(node){

     ourJ(node).css("filter", "blur(6px)")
     ourJ(node).hover(
     function () {
     ourJ(node).css("filter", "blur(0px)")
     }, 

     function () {
     ourJ(node).css("filter", "blur(6px)")
     }
     );


     ourJ(node).find('*').each(function(child){

     ourJ(child).css("filter", "blur(6px)")

     ourJ(child).hover(
     function () {
     ourJ(child).css("filter", "blur(0px)")
     }, 

     function () {
     ourJ(child).css("filter", "blur(6px)")
     }
     );


     //censor_obj(child)
     })
     })


     censor_arr(mutrec.addedNodes)

     })

     */

})

var config = {subtree:true, childList: true};

observer.observe(document.body, config);



function censor_page(objarr, ofsarr, pagetext) {
    analyzeSentiment(pagetext, function(data){

        console.log(data)

        var sentence_index = 0

        for(var i = 0; i < objarr.length; i++){

            var total_sentiment = 0;
            var total_score = 0;
            var total_magnitude = 0;

            console.log(":::::",ourJ(objarr[i]).clone().children().remove().end().text(), ":::::")        

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
}