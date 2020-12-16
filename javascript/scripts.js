$(document).ready(function() {
  /*---------- Full-Page Fade-In (at load) ----------*/
  // Instantly remove fade-out and load classes from BODY
  $(function() {
    $('body').removeClass('fade-out load');
  });

  /*---------- Add 'hover' class to h2 When parent 'portfolio-card' is hover  ----------*/
  $('.portfolio-card').hover(
    function() {
      $(this).children().addClass('js-hover');
    },
    function() {
      $(this).children().removeClass('js-hover');
    });

  /*---------- FADE-OUT the page when a link is clicked ----------*/
  $('a').click(function(e) {
    if ($(this).hasClass('fade-link-js')) {
      if ($(this).hasClass('nav-link')) {
        $(this).attr('class', 'nav-link active fade-link-js')
      }
      e.preventDefault();
      $('body').addClass('fade-out');
      var newLocation = this.href;

      setTimeout(function() {
        window.location.href = newLocation;
      }, 500);
    }
  })

});
