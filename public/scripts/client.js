const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



const createTweetElement = function(tweetObj) {
  const renderTweet = `
  <article>
  <header>
    <img src="${tweetObj.user.avatars}"/> 
    ${tweetObj.user.name}
    <span>${tweetObj.user.handle}</span>
  </header>
  ${tweetObj.content.text}
  <hr>
  <footer>
  ${moment(new Date(tweetObj.created_at), "YYYYMMDD").fromNow()}
    <span>
      <img src="/images/flag.png"> 
      <img src="/images/retweet-arrows.png"> 
      <img src="/images/love.png"> 
    </span>
  </footer>
  </article>
    `;
    return renderTweet;
}


const renderTweets = (results) => {
  for (let result of results) {
    $('#tweet').append(createTweetElement(result));
  }
}

$(document).ready( () => {
  renderTweets(tweetData);

  $("form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
  
  $.ajax("/tweets", {
    method: "POST",
    data,
  
  })
})
  
  })
  











