$(document).ready(function() {
  $(function () {
    $('body').removeClass('fade-out load');
  })


  /*---------- Add 'hover' class to h2 When parent 'portfolio-card' is hover  ----------*/
  $('.portfolio-card').hover(
    function() {
      $(this).children().addClass('js-hover');
    },
    function() {
      $(this).children().removeClass('js-hover');
    });

  /*---------- FADE-OUT the page when a link is clicked ----------*/
  /*---------- I disabled this code because when the back button is pressed in iOS the page loads with an opacity of ZERO... ----------*/
  // $('a').click(function(e) {
  //   /*---------- If the user clicked a link that has the '.fade-js' class... ----------*/
  //   if ($(this).hasClass('fade-link-js')) {
  //     /*---------- If the link is ALSO in the navbar... ----------*/
  //     if ($(this).hasClass('nav-link')) {
  //       $(this).attr('class', 'nav-link active fade-link-js')
  //     }
  //     e.preventDefault(); // Prevent the link from activating right away
  //     $('body').addClass('fade-out'); // Fade out the entire page
  //     var newLocation = this.href;
  //
  //     setTimeout(function() {
  //       window.location.href = newLocation; // Go to the links href location in 0.5s
  //     }, 500);
  //   }
  // })

});
