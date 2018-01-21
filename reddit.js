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


analyzeSentiment(userContent, function(analyzedData) {
    console.log(analyzedData);
    var sentences = analyzedData.sentences;
    var sentencesIdx = 0;
    var currOffset = 0;
    for(var i = 0; i < objArr.length; ++i)
    {
        var currentObj = objArr[i];
        var totalScore = 0;
        var totalMagnitude = 0;
        currOffset += currentObj.text().length;
        for (; sentencesIdx < sentences.length; ++sentencesIdx)
        {
            var sentence = sentences[sentencesIdx];
            if (sentence.text.beginOffset >= currOffset)
            {
                console.log("MATCHING: \"" + text + "\"\n\"" + sentence.text.content + "\"");
                break;
            }
            var totalScore += sentence.sentiment.score;
            var totalMagnitude += sentence.sentiment.magnitude;
        }

    }
});
