var apiKey = undefined;


function analyzeSentiment(text, cb) {
    chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

var userContent = "";
var objArr = new Array();

$(".title a.title").each(function() {
    objArr.push($(this));
    var text = $(this).text();
    if(text.length > 0) {
        userContent += text + "\n\n";
        console.log("TITLES: " + text + " LENGTH: " + text.length);
    }
});

$(".usertext-body").each(function() {
    objArr.push($(this));
    var text = $(this).text();
    if(text.length > 0) {
        userContent += text + "\n\n";
        console.log("COMMENTS: " + text + " LENGTH: " + text.length);
    }
});

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
            if (sentence.text.beginOffset >= currOffset)
            {
                break;
            }
            totalSentiment += sentence.sentiment.score * sentence.sentiment.magnitude;
        }
        censor(currentObj, totalSentiment);
        totalSentiment = 0;
    }
});
