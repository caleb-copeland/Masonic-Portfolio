$(window).ready(function() {

  /*---------- Full-Page Fade-In (at load) ----------*/
  // Instantly remove fade-out and load classes from BODY
  $(function() {
    $('body').removeClass('fade-out load');
  });

  /*---------- Set layout when page is loaded ----------*/
  // Variable to hold current screen width
  let screenWidth = $(window).width();
  // Width of large screen break (px)
  const largeScreen = 992;
  // Width of x-large screen break (px)
  const xtraLargeScreen = 1200;

  $(window).ready(function() {
    // If screen width is greater than "largeScreen"...
    if (screenWidth >= largeScreen) {
      updateDesktopLayout();
    // If screen width is smaller than "largeScreen"...
    } else if (screenWidth < largeScreen) {
      updateMobileLayout();
    }
  })

  /*---------- When the window is resized ----------*/
  $(window).resize(function() {
    // If the window has been resized to a "largeScreen" OR an "extraLargeScreen" width...
    if ((screenWidth >= xtraLargeScreen && $(this).width() < xtraLargeScreen) || (screenWidth < xtraLargeScreen && $(this).width() >= xtraLargeScreen) || (screenWidth < largeScreen && $(this).width() >= largeScreen)) {
      screenWidth = $(this).width();
      updateDesktopLayout();
    // If the window has been resized to a width smaller than "largeScreen" width...
    } else if (screenWidth >= largeScreen && $(this).width() < largeScreen) {
      screenWidth = $(this).width();
      updateMobileLayout();
    }
  })

  /*---------- Function to update the layout in desktop view ----------*/
  const updateDesktopLayout = () => {
    var cardHeights = [];
    $('.main-content').each(function(i) {
      cardHeights[i] = $(this).height();

      if (i > 1) {
        var heightGap = -(cardHeights[i - 1] - cardHeights[i - 2] + 30);
        if (i % 2 === 0) {
          $(this).css('top', heightGap + 'px');
        } else {
          $(this).css('margin-top', '1.5rem');
        }
      }
    });
  }

  /*---------- Function to update the layout in mobile view ----------*/
  const updateMobileLayout = () => {
    $('.main-content').each(function(i) {
      $(this).css('top', '0px');
      $(this).css('margin-top', '0.75rem');
    });
  }

  /*---------- Add 'hover' class to h2 When parent 'portfolio-card' is hover  ----------*/
  $('.portfolio-card').hover(
    function() {
      $(this).children().addClass('hover');
      console.log ($(this).children('h2').attr('class'));
    },
    function() {
      $(this).children().removeClass('hover');
    });

  /*---------- FADE-OUT the page when a link is clicked ----------*/
  $('a').click(function(e) {
    if ($(this).attr('target') != '_blank') {
      e.preventDefault();
      $('body').addClass('fade-out');
      var newLocation = this.href;

      setTimeout(function() {
        window.location.href = newLocation;
      }, 500);
    }
  })
});
