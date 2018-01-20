$("*").each(function() {
  var text = $(this).clone().children().remove().end().text();
  if(text.length > 0) {
    console.log(text);
  }
});
