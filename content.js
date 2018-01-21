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




//console.log(pagetext)
//console.log(objarr)


//console.log(objarr[0].clone().children().remove().end().text())


console.log(objarr.length);
censor_arr(objarr);

*/

function censor_arr(obj_arr){

    obj_arr.forEach(function(obj, i){

	//console.log("TSERTHRZETSYSETYDSERYDRSETDYR",obj);

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


//censor_page(objarr, pagetext)


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    //console.log("RECENSOR")

    if(request.type === "recensor")
        redo();
});


redo()


function redo(){

    var pagetext = "";
    var objarr = [];
    var ofsarr = [];



    getOptimizedCheckbox(function(opt){
        //console.log(opt)

        if(opt){
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

        } else {
            ourJ("*:visible").each(function() {
                objarr.push(this);
            })

            censor_arr(objarr);   
        }
    });


    //censor_arr(objarr);
}



function censor_page(objarr, ofsarr, pagetext) {
    analyzeSentiment(pagetext, function(data){

        //console.log(data)

        var sentence_index = 0

        for(var i = 0; i < objarr.length; i++){

            var total_sentiment = 0;
            var total_score = 0;
            var total_magnitude = 0;

            //console.log(":::::",ourJ(objarr[i]).clone().children().remove().end().text(), ":::::")        

            while(true) {
                sentence = data.sentences[sentence_index]

                //console.log(sentence.text.beginOffset, ofsarr[i+1])

                if(sentence.text.beginOffset >= ofsarr[i+1]){
                    break;
                }
                //console.log("\t\t\t",sentence.text.content)

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
