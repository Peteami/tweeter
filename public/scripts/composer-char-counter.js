$(() => {
  $("#tweet-text").keyup(function() {
    const maxCount = 140;
    let length = $(this).val().length;
    let actualCount = maxCount - length;
    if (actualCount < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
    $(".counter").text(actualCount);
  })
});