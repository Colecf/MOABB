var apiKey = undefined;
analyzeSentiment("I hate google.", function(response) {
  console.log(response);
});



var pagetext = ""
var objarr = []

function analyzeSentiment(text, cb) {
  chrome.runtime.sendMessage({type: "analyzeSentiment", text: text}, cb);
}

$("*:not(script)").each(function() {



  var text = $(this).clone().children().remove().end().text();


  if(text.length > 0) {

    console.log(text);
    pagetext += "\n\n"+text
    objarr.push($(this))


    //if(Math.random() > 0.5){
    $(this).css("filter", "blur(6px)")

    $(this).hover(
    function () {
        $(this).css("filter", "blur(0px)")
    }, 
    function () {
        $(this).css("filter", "blur(6px)")
    }
    );

    //$(this).css("hover", "filter: blur(0px)")
//}
    //this.style.filter = "blur(6px)"

  }
});


console.log(pagetext)
console.log(objarr)

analyzeSentiment(text, function(data){


	sentences = data.sentences

	obj_index = 0;

	for(var i = 0; i < sentences.length; i++){

	}


})

