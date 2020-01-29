

$(document).ready(function() {
  // --- our code goes here ---
  console.log("JQuery on composer-char-counter.js loaded.")

  $( "#myTweet" ).keyup(function() {
    $("#myCounter")[0].innerText = (140 - this.value.length);
    if (this.value.length > 140 ){
      $("#myCounter").addClass("over140");
    } else {
      $("#myCounter").removeClass("over140");
    }
  });

});
