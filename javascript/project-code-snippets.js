$(document).ready(function() {
  // When the page loads...
  $('#details-tab').attr('class', 'code-tab active'); // Start with the details link as active
  projectSnippets('details-tab'); // Display "details" text


  $('.code-tab').click(function() {
    let tab = $(this).attr('id'); // Get the clicked link's #ID
    codeDisplayReset(); // Clear all 'code-tab' links of the .active class
    projectSnippets(tab); // Update which code snippet is displayed
  })
})

/*---------- Function displays code based on what 'code-tab' link was clicked ----------*/
const projectSnippets = (source) => {
  $('#' + source).attr('class', 'code-tab active');

  if (source === 'details-tab') {
    $('#details-code').css('display', 'block');
  } else if (source === 'html-tab') {
    $('#html-code').css('display', 'block');
  } else if (source === 'css-tab') {
    $('#css-code').css('display', 'block');
  } else if (source === 'js-tab') {
    $('#js-code').css('display', 'block');
  }

}

/*---------- Function displays "none" and clears the '.active' class for all code displays----------*/
const codeDisplayReset = () => {
  $('.code-container > div').css('display', 'none');
  $('.code-tab').each(function() {
    $(this).attr('class', 'code-tab');;
  })


}
