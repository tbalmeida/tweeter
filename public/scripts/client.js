const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

  // reference to the name of the tweets container on index.html  
  const $tweetContainer = $(".tweets");

  // returns a tweet in a <article> element
  const createTweetElement = function ( tweet ) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(tweet.created_at);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    const myTweet = `<article>` +
        `<header class="tweet">` +
        `<span><img src="${tweet.user.avatars}" width="80" height="80" align=center>${tweet.user.name}</span>` +
        `<span>${tweet.user.handle}</span>` +
        `</header>` +
        `<p>${safeHTML}</p>` +
        `<footer class="tweetFooter">` +
        `<span>${diffDays} days ago <small class="tweetActions">(${firstDate.toDateString()})</small></span>` +
        `<span class="tweetActions"><i class="far fa-flag"></i> <i class="fas fa-retweet"></i> <i class="far fa-heart"></i></span>` +
        `</footer>` +
        `</article>` +
        `</div>`;
    return myTweet
  }

const renderTweets = function (tweets) {
  $tweetContainer.empty();
  const $createdTweets = $(tweets.map(createTweetElement).join(" "));
  return $tweetContainer.append($createdTweets);
};

const getTweetsFromServer = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  }).then(function (tweets) {
    tweets.reverse();
    renderTweets(tweets)
  });
}

const tweetPostHandler = function () {
  $(function() {
    const $button = $("#postTweet");

    $button.on("click", function () {
      event.preventDefault();

      // Get the tweet text, trim the leading/trailing white spaces and validates the size
      const myTweet = $("#myTweet").val().trim();

      if (myTweet.length > 140){
        $( "#errorMsg" ).slideDown( 300 );
        $( "#errorMsg" ).text("Your tweet exceeded the maximum message length.");
        return false;
      } else if (myTweet.length === 0) {
        $( "#errorMsg" ).slideDown( 300 );
        $("#errorMsg").text("Your tweet can't be empty.");
        return false;
      } else {
        const formData = $( "form" ).serialize();
        $.ajax( {
          url: "/tweets",
          method: "POST",
          data: formData
        })
        .then( function (createdTweet) {
          getTweetsFromServer();
          $("#myTweet").val("").empty();
        })
        $( "#errorMsg" ).slideUp( 300 );
      }
    });
  });
};

// attaches the new handler to the Tweet button
tweetPostHandler();
getTweetsFromServer();

// hides the new tweet menu
$( "#newTweetMenu" ).slideUp( 0 );

// binds the function to toggle the visibility of the new tweet area to the "Write a new tweet" area
$( ".writeNewTweet" ).bind( "click", function() {
  $( "#newTweetMenu" ).slideToggle( 1200 );
  $("#myTweet").focus();
});


// binds the function to toggle the visibility of the new tweet area to the "Write a new tweet" area
$( ".arrowUp" ).bind( "click", function() {
  $([document.documentElement, document.body]).animate({
      scrollTop: $(".username").offset().top
  }, 2000);
  $( "#newTweetMenu" ).slideDown( 1200 );
  $("#myTweet").focus();
});

// rolls up the error container when the page is reloaded
$("#errorMsg" ).slideUp( 0 );
