$(window).ready(function() {

  /*---------- Full-Page Fade-In (at load) ----------*/
  $(function() {
    $('body').removeClass('fade-out load');
  });


  // Variable to hold current screen width
  let screenWidth = $(window).width();
  const largeScreen = 992;
  const xtraLargeScreen = 1200;

  $(window).ready(function() {
    // If screen is "lg" then
    if (screenWidth >= largeScreen) {
      updateDesktopLayout();
    } else if (screenWidth < largeScreen) {
      updateMobileLayout();
    }
  })

  $(window).resize(function() {
    if ((screenWidth >= xtraLargeScreen && $(this).width() < xtraLargeScreen) || (screenWidth < xtraLargeScreen && $(this).width() >= xtraLargeScreen) || (screenWidth < largeScreen && $(this).width() >= largeScreen)) {
      screenWidth = $(this).width();
      updateDesktopLayout();
    } else if (screenWidth >= largeScreen && $(this).width() < largeScreen) {
      screenWidth = $(this).width();
      updateMobileLayout();
    }
  })

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

  $('.portfolio-card').hover(
    function() {
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
    });
});
