/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  // reference to the name of the tweets container on index.html  
  const $tweetContainer = $(".tweets");

  // returns a tweet in a <article> element
  const createTweetElement = function ( tweet ) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(tweet.created_at);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const myTweet = `<article>` +
        `<header class="tweet">` +
        `<span><img src="${tweet.user.avatars}" width="80" height="80" align=center>${tweet.user.name}</span>` +
        `<span>${tweet.user.handle}</span>` +
        `</header>` +
        `<p>${tweet.content.text}</p>` +
        `<footer style="display: flex; justify-content: space-between; border-top: solid 2px darkgrey;">` +
        `<span>${diffDays} days ago (${firstDate.toDateString()})</span>` +
        `<span>[like] [comment]</span>` +
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
    renderTweets(tweets)
  });
}


const tweetPostHandler = function () {
  $(function() {
    const $button = $("#postTweet");

    $button.on("click", function () {
      event.preventDefault();
      const formData = $( "form" ).serialize();

      $.ajax( {
        url: "/tweets",
        method: "POST",
        data: formData
      })
      .then( function (createdTweet) {
        getTweetsFromServer();
      })

    });
  });
};

// attaches the new handler to the Tweet button
tweetPostHandler();
getTweetsFromServer();