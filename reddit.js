var apiKey = undefined;


function analyzeSentiment(text, cb) {
    chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

var userContent = "";
var objArr = new Array();

ourJ(".title a.title").each(function() {
    var text = ourJ(this).text();
    if(!isEmptyOrSpaces(text)) {
        objArr.push(ourJ(this));
        userContent += text + "\n\n";
    }
});

ourJ(".usertext-body").each(function() {
    var text = ourJ(this).text();
    if(!isEmptyOrSpaces(text)) {
        objArr.push(ourJ(this));
        userContent += text + "\n\n";
    }
});

/*ourJ("*:visible").each(function() {
    var text = ourJ(this).clone().children().remove().end().text();
    if(text.length > 6) {
        objArr.push(ourJ(this));
        userContent += text + "\n\n";
    }
});*/

analyzeSentiment(userContent, function(analyzedData) {
    console.log(analyzedData);
    var sentences = analyzedData.sentences;
    var sentencesIdx = 0;
    var currOffset = 0;
    for(var i = 0; i < objArr.length; ++i)
    {
        var currentObj = objArr[i];
        var totalSentiment = 0;
        currOffset += currentObj.text().length;
        for (; sentencesIdx < sentences.length; ++sentencesIdx)
        {
            var sentence = sentences[sentencesIdx];
            if (sentence.text.beginOffset > currOffset)
            {
                break;
            }
            totalSentiment += sentence.sentiment.score;
        }
        censor(currentObj, totalSentiment);
        //console.log("censored: " + currentObj.text() + totalSentiment);
        totalSentiment = 0;
    }
});
