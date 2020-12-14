$(document).ready(function() {
  /*---------- Declare Variables ----------*/
  let codeDisplay = '';

  // When the page loads... Display "details" text
  memorySnippets ('details');

  $('.code-tab').click(function () {
    if ($(this).hasClass('html')) {

    }
  })


})


const memorySnippets = (source) => {
  var memDetails = "Pure javascript, css, and html memory game. Object oriented design utilizing classes for efficient code. Mobile compatible with different layouts for portrait and landscape.";




    if (source === 'details') {
      console.log(memDetails);
      $('.code-container').text(memDetails);
    }

}
