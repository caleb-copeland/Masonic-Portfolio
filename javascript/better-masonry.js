$(document).ready(function() {
  /*---------- Set layout when page is loaded ----------*/
  let screenWidth = $(window).width(); // Variable to hold current screen width
  const largeScreen = 992; // Width of large screen break (px)
  const xtraLargeScreen = 1200; // Width of x-large screen break (px)

  $(document).ready(function() {
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
    var cardPositions = [];
    var cardHeights = []; //Array stores height of every ".portfolio-card"
    var padding = (16 * 2); // 16px (1rem @ lg screen)

    // Loop through every instance of ".free-masonty"...
    $('.free-masonry').each(function(i) {
      cardPositions[i] = $(this).offset(); // Stores all card top positions in array
      cardHeights[i] = $(this).outerHeight(); // Store all card heights in array (including margins)

      // If the current card's index IS AFTER the first two cards...
      // [The first two cards will always be flush with the top]
      if (i > 1) {
        var currentCardTop = cardPositions[i].top; // Get TOP position of current card

        var cardDirectlyAboveTop = cardPositions[i - 2].top; // Get TOP position of the card that is directly above the current card

        var cardDirectlyAboveHeight = cardHeights[i - 2]; // Get HEIGHT of the card that is directly above the current card
        var cardDirectlyAboveBottom = cardDirectlyAboveTop + cardDirectlyAboveHeight; // Get BOTTOM position of the card that is directly above the current card

        var heightGap = currentCardTop - cardDirectlyAboveBottom; // Variable to hold how far the card needs to be adjusted.

        var updatedCurrentCardTop = currentCardTop - heightGap; // Variable holds the card's current top position minus the distance to the bottom of the card directly above it.

        $(this).offset({
          top: updatedCurrentCardTop + padding
        }); // Adjust the actual top position in the current card

        cardPositions[i].top = $(this).offset().top; // Update the position array with the new top position for the current card. This affects the placement of the upcoming cards in the loop (if there are any)

        /*---------- Console Logs ----------*/
        // console.log('-------------------------');
        // console.log(`Above Top: ${cardDirectlyAboveTop}`);
        // console.log(`Above Height: ${cardDirectlyAboveHeight}`);
        // console.log(`Above Bottom: ${cardDirectlyAboveBottom}`);
        // console.log(`Curent Top: ${currentCardTop}`);
        // console.log(`Height Gap: ${heightGap}`);
        // console.log(`New Current Top: ${updatedCurrentCardTop}`);
        // console.log(`Adjusted Top: ${cardPositions[i].top}`);

      }
    });
  }

  /*---------- Function to update the layout in mobile view ----------*/
  const updateMobileLayout = () => {
    $('.free-masonry').each(function(i) {
      $(this).css('top', '0px');
      $(this).css('margin-top', '0.75rem');
    });
  }

})
