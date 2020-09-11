const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Create New Tweet Template
const createTweetElement = function(tweetObj) {
  const renderTweet = `
  <article>
  <header>
    <img src="${tweetObj.user.avatars}"/> 
    ${tweetObj.user.name}
    <span class="handle">${tweetObj.user.handle}</span>
  </header>
  <div>${escape(tweetObj.content.text)}</div>
  <hr>
  <footer>
  ${moment(new Date(tweetObj.created_at), "YYYYMMDD").fromNow()}
    <span class="icons-render">
      <img src="/images/flag.png"> 
      <img src="/images/retweet-arrows.png"> 
      <img src="/images/love.png"> 
    </span>
  </footer>
  </article>
    `;
  return renderTweet;
};


// Render All Existing Tweets
const renderTweets = (results) => {
  for (let result of results) {
    $('#render-tweet').prepend(createTweetElement(result));
  }
};

// Fetch Existing Tweets
const loadTweets = function() {
  $.ajax("/tweets", { method: "GET",
    success: function(response) {
      renderTweets(response);
    }
  });
};



// Once page is load, call function
$(document).ready(() => {
  loadTweets();

  $("form").on("submit", function(event) {
    event.preventDefault();      // return alert("The tweet box is empty!");
    const data = $(this).serialize();
    
    if (!data.slice(5)) {
      $("#alert-Box").css("display", "inherit");
      return $(".error-message").text("The tweet box is empty!");


    } else if (data.slice(5).length > 140) {
      $("#alert-Box").css("display", "inherit");
      return $(".error-message").text("Your tweet is longer than 140 characters!");
    }
  
    $.ajax("/tweets", {
      method: "POST",
      data,
      success: function(response) {
        $.ajax("/tweets", { method: "GET",
          success: function(response) {
            $('#render-tweet').prepend(createTweetElement(response[response.length - 1]));
            $(".counter").text(140);
            $("#tweet-text").val("");
            $("#alert-Box").css("display", "none");
          }
        });
      }
    });
  });



  // scroll up button
  $(document).on("scroll", function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      $("#up-button").css("display", "block");
    } else {
      $("#up-button").css("display", "none");
    }
  });

  $("#up-button").on("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
  








