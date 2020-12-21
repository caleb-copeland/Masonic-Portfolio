/*------------------------------------*/
/*---------- Better Masonry ----------*/
/*------------------------------------*/
let screenWidth = $(window).width(); // Variable to hold current screen width
let layoutChange = false;
let cardPositions = [];
let cardHeights = []; //Array stores height of every ".portfolio-card"
const padding = (16 * 2); // 16px (1rem @ lg screen)

$(document).ready(function() {
  /*---------- Set layout when page is loaded ----------*/
  const largeScreen = 992; // Width of large screen break (px)
  const xtraLargeScreen = 1200; // Width of x-large screen break (px)

  /*---------- When the page loads run the function onLoad ----------*/
  // If screen width is greater than "largeScreen"...
  if (screenWidth >= largeScreen) {
    updateDesktopLayout();
    currentLayout = 'desktop';
    // If screen width is smaller than "largeScreen"...
  } else if (screenWidth < largeScreen) {
    updateMobileLayout();
    currentLayout = 'mobile';
  }

  /*---------- When the window is resized ----------*/
  $(window).on('resize keydown', function() {
    /*---------- If the window has been resized from an "XL" screen to a "largeScreen" width ----------*/
    if (screenWidth >= xtraLargeScreen && ($(window).width() < xtraLargeScreen && $(window).width() >= largeScreen)) {
      console.log('XL -> L');
      layoutUpdater('desktop');

      /*---------- If the window has been resized from a "largeScreen" screen to an "XL" width ----------*/
    } else if ((screenWidth >= largeScreen && screenWidth < xtraLargeScreen) && ($(window).width() >= xtraLargeScreen)) {
      console.log('L -> XL');
      layoutUpdater('desktop');

      /*---------- If the window has been resized from a "Mobile" screen to a "largeScreen" width ----------*/
    } else if (screenWidth < largeScreen && ($(window).width() >= largeScreen && $(window).width() < xtraLargeScreen)) {
      console.log('M -> L');
      layoutUpdater('desktop');

      /*---------- If the window has been resized from a "Mobile" screen to an "xtraLargeScreen" width ----------*/
    } else if ((screenWidth < largeScreen) && ($(window).width() >= xtraLargeScreen)) {
      console.log('M -> XL');
      layoutUpdater('desktop');

      // If the window has been resized to a width smaller than "largeScreen" width...
    } else if (screenWidth >= largeScreen && $(window).width() < largeScreen) {
      console.log('L -> mobile');
      layoutUpdater('mobile');

    }

    /*---------- If a layout change has been activated... ----------*/
    if (layoutChange) {
      $('.free-masonry').css('opacity', 0); // All elements in class to opacity:0
      layoutChange = false; // Reset 'layoutChange'
    }
  })
})


/*---------- Selects which layout to update, updates "screenWidth", and initiates timeouts  ----------*/
const layoutUpdater = (layout) => {
  layoutChange = true;
  screenWidth = $(window).width();
  console.log(screenWidth);

  setTimeout(function() {
    if (layout === 'desktop') {
      updateDesktopLayout();
    } else if (layout === 'mobile') {
      updateMobileLayout();
    }
  }, 300);
}


/*---------- Function to update the layout in desktop view ----------*/
const updateDesktopLayout = () => {
  let heightGap = 0; // Initialize heightGap variable...
  $('.free-masonry').css('top', 0); // Resets the CSS 'top' value

  setTimeout(function() {
    // Loop through every instance of ".free-masonry"...
    $('.free-masonry').each(function(i) {
      cardHeights[i] = $(this).outerHeight(); // Store all card heights in array (including margins)

      if ((i > 1) && (i % 2 === 0)) {
        heightGap += cardHeights[i - 1] - cardHeights[i - 2]; // Variable to hold how far the card needs to be adjusted.
        $(this).css('top', padding - heightGap);

      } else if ((i > 1) && (i % 2 !== 0)) {
        $(this).css('top', padding);
      }
    })
    fadeInClass('.free-masonry');
  }, 500);
}

/*---------- Function to update the layout in mobile view ----------*/
const updateMobileLayout = () => {
  setTimeout(function() {
    $('.free-masonry').each(function() {
      /*---------- A full reset to return to 'Bootstrap' standards ----------*/
      $(this).css('top', padding);
      var top = $(this).css('top');
      console.log(top);
    })

    fadeInClass('.free-masonry');
  }, 500);
}

/*---------- Fade In all elements of class '.free-masonry' simultaneously  ----------*/
const fadeInClass = (className) => {
  setTimeout(function () {
    $(className).animate({
      opacity: 1
    }, 'slow')
  }, 250);
}
