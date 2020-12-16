$(document).ready(function() {
  ////////////////////////////////////////////////
  /* ---------- Initialize Variables ---------- */
  // Assign inputs fields to variables
  const fcInput = document.getElementById("fc-input");
  const trtInput = document.getElementById("trt-input");
  const dtrInput = document.getElementById("dtr-input");

  // Initialize array to flag if an input field is completed or not
  let completedFields = {
    fc: false,
    trt: false,
    dtr: false,
    numCompleted: 0
  };

  // Initialize a variable to flag if an input field has a calculated display or not
  let calcFlag = false;

  // Flags if the ABOUT window is shown
  let aboutIsShown = false;

  ///////////////////////////////////////////
  /* ---------- Event listeners ---------- */
  // MOUSE OVER listener
  document.addEventListener(
    "mouseover",
    (event) => {
      // Add background column hover if mouse over an element in the column
      if (event.target != undefined) {
        event.target.parentNode.classList.add("bg-hover");
      }
      // Add input field hover
      if (event.target.getAttribute("class") === "input-field") {
        event.target.parentNode.classList.add("input-hover");
        // Add background hover if mouse over the column itself
      } else {
        event.target.classList.add("bg-hover");
      }

      if (event.target.id === "about" || event.target.id === "x-about") {
        // Add hover  to the '?' button
        event.target.classList.add("hover");
      }
    },
    false
  );

  // MOUSE OUT listener
  document.addEventListener(
    "mouseout",
    (event) => {
      // Remove input field hover
      if (event.target.getAttribute("class") === "input-field") {
        event.target.parentNode.classList.remove("input-hover");
        // Remove background column hover
      } else {
        event.target.classList.remove("bg-hover");
      }

      if (event.target.id === "about" || event.target.id === "x-about") {
        // Add hover  to the '?' button
        event.target.classList.remove("hover");
      }
    },
    false
  );

  // CLICK listener
  document.addEventListener(
    "click",
    (event) => {
      // If the user has clicked on the '?' button in footer or the 'x' button in the about window...
      if (event.target.id === "about" || event.target.id === "x-about" || event.target.id === "about-overlay") {
        // Toggle ABOUT window
        toggleAboutWindow();
      }
    }
  )

  // FOCUS IN listener
  document.addEventListener(
    "focusin",
    (event) => {
      // Add the focus from the current target
      event.target.parentNode.classList.add("focus");

      // If the DTR input field is the current target and the user HAS typed anything...
      if (event.target.getAttribute("id") === "dtr-input") {
        // ADD focus to the % suffix
        event.target.parentNode.classList.add("perc");
      }

      // Whenever a new focus event occurrs...
      removeCalculated(event.target);
    },
    false
  );

  // FOCUS OUT listener
  document.addEventListener(
    "focusout",
    (event) => {
      // Remove the focus from the current target
      event.target.parentNode.classList.remove("focus");

      // If the DTR input field is the current target and the user HAS NOT typed anything...
      if (
        event.target.getAttribute("id") === "dtr-input" &&
        event.target.value === ""
      ) {
        // Remove focus from the % suffix
        event.target.parentNode.classList.remove("perc");
      }
    },
    false
  );

  // INPUT listener
  document.addEventListener("input", (event) => {
    // Every new input change the label
    clearLabel(event.target);
    // Every new input check if ANY input field is complete
    isComplete();
    // Pick which calculation to perform
    calculationPicker();
    // If there are not two completed input fields...
    removeCalculated();
  });

  ////////////////////////////////////////////////////////////////////////
  /* ---------- Clears the placeholder as input is processed ---------- */
  const clearLabel = (input) => {
    // Initialize variables
    const inputLength = input.value.length;
    const time = "mm:ss";
    const perc = "##.##";
    // Variable for the parent node of the input field
    const parent = input.parentNode;
    // The LABEL element sibling of input field in use
    const label = parent.getElementsByTagName("label")[0];
    // The ID of the label
    const labelId = label.id;
    // Create a variable for the text value of the label
    let labelText = document.getElementById(labelId).textContent;

    // If the input field in use is EITHER the FC or the TRT field
    if (labelId === "fc-label" || labelId === "trt-label") {
      // Overwrite the current [fc/trt] LABEL text to its original value
      labelText = time;
      // If the input field in use is the DTR field
    } else {
      // Overwrite the current LABEL text to its original value
      labelText = perc;
    }

    // Variable holds original label text minus the number of characters the user has input
    let newText = labelText.substr(inputLength);
    // Overwrite the current LABEL text to its original value
    document.getElementById(labelId).textContent = newText;
    // Shift the label one character to the right
    label.style.paddingLeft = (inputLength * 0.55) + "rem";
  };

  /////////////////////////////////////////////////////////////////////////
  /* ---------- Checks if each input field is complete or not ---------- */
  const isComplete = () => {
    // If the fc input field HAS five characters...
    if (fcInput.value.length === 5) {
      // Mark as complete
      completedFields.fc = true;
      fcInput.parentNode.classList.add("complete");
      // If the fc input field DOES NOT HAVE five characters...
    } else {
      // Mark as incomplete
      completedFields.fc = false;
      fcInput.parentNode.classList.remove("complete");
    }

    // If the trt input field HAS five characters...
    if (trtInput.value.length === 5) {
      // Mark as complete
      completedFields.trt = true;
      trtInput.parentNode.classList.add("complete");
      // If the trt input field DOES NOT HAVE five characters...
    } else {
      // Mark as incomplete
      completedFields.trt = false;
      trtInput.parentNode.classList.remove("complete");
    }

    // If the dtr input field HAS five characters...
    if (dtrInput.value.length === 5 || dtrInput.value.length === "00:00") {
      // Mark as complete
      completedFields.dtr = true;
      dtrInput.parentNode.classList.add("complete");
      // If the dtr input field DOES NOT HAVE five characters...
    } else {
      // Mark as incomplete
      completedFields.dtr = false;
      dtrInput.parentNode.classList.remove("complete");
    }

    // Update how many fields are marked COMPLETE and update the 'numComplete' key in the 'completedFields' object
    completedFields.numCompleted = Object.values(completedFields).filter(
      (element) => element === true
    ).length;
  };

  //////////////////////////////////////////////////////////////
  /* ---------- Determins which field to calculate ---------- */
  const calculationPicker = () => {
    //If no calculation is currently displayed
    if (!calcFlag) {
      // Calculate the DTR if FC and TRT are completed
      if (completedFields.fc === true && completedFields.trt === true) {
        dtrInput.parentNode.classList.add("calculate");
        percentCalculator();

        // Calculate the TRT... if FC and DTR are completed
      } else if (completedFields.fc === true && completedFields.dtr === true) {
        trtInput.parentNode.classList.add("calculate");
        timeCalculator("fc-input", "trt-input");

        // Calculate the FC... if TRT and DTR are completed
      } else if (completedFields.trt === true && completedFields.dtr === true) {
        fcInput.parentNode.classList.add("calculate");
        timeCalculator("trt-input", "fc-input");
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////
  /* ---------- Calculates the DTR as a percentage and displays the value ---------- */
  const percentCalculator = () => {
    // Split the input strings into a new array to separate minutes and seconds (and remove the delimiter)
    const fcNums = fcInput.value.split(":");
    const trtNums = trtInput.value.split(":");
    // Parse the array strings to integers
    const fcMinutes = parseInt(fcNums[0], 10);
    const fcSeconds = parseInt(fcNums[1], 10);
    const trtMinutes = parseInt(trtNums[0], 10);
    const trtSeconds = parseInt(trtNums[1], 10);
    // Save total number of seconds for FC and TRT
    const fcTotSec = fcMinutes * 60 + fcSeconds;
    const trtTotSec = trtMinutes * 60 + trtSeconds;

    // Calculates the value for the DTR, converts to percentage, and rounds to two decimals
    // Add a zero before the calculation to account for an answer that is less than 1 but greater than -1
    // DTR = ((TRT - FC) / (TRT))
    let dtrValue = "0" + ((100 * (trtTotSec - fcTotSec)) / trtTotSec).toFixed(2);
    // Trim down the string to be only FIVE characters long
    dtrValue = dtrValue.slice(-5);
    // Remove DTR label from the DTR input field
    document.getElementById("dtr-label").textContent = "";
    // Percent symbol activate
    document.getElementById("dtr-label").parentNode.classList.add("perc");
    // Reset DTR input field to empty
    dtrInput.value = "";
    // Change DTR input to display calculated value
    dtrInput.value = dtrValue;

    // Check for two possible errors...
    // If the user entered '00:00' for BOTH the FC and the TRT inputs...
    if (fcInput.value === "00:00" && trtInput.value === "00:00") {
      // Divide by zero error
      dtrInput.value = "div/0";
      // If the user entered the FC value as a LARGER value than the TRT value
    } else if (fcInput.value > trtInput.value) {
      dtrInput.value = "fc>tt";
    }

    // Set DTR Calc flag to true
    calcFlag = "dtr-input";

    // Update isComplete
    isComplete();
  };

  ////////////////////////////////////////////////////////////////////////
  /* ---------- Calculates the FC/TRT and displays the value ---------- */
  const timeCalculator = (known, unknown) => {
    // Initialize variables
    let unknownVariableString = "";
    let unknownTotSec = 0;
    let unknownLabel = "";

    // Convert the DTR input to a point number and converts to decimal
    const dtrValue = parseFloat(dtrInput.value) / 100;

    // Convert the known time variable from a string to TOTAL SECONDS
    // Split the input string of the known time variable into a new array to separate minutes and seconds (and remove the delimiter)
    const knownNum = document.getElementById(known).value.split(":");
    // Parse the array strings to integers
    const knownMinutes = parseInt(knownNum[0], 10);
    const knownSeconds = parseInt(knownNum[1], 10);
    //  Seconds of the known time variable
    const knownTotSec = knownMinutes * 60 + knownSeconds;

    // Calculate the uknown variable
    const unknownValue = [];

    // Calculate TRT
    if (known === "fc-input") {
      // TRT = (FC / (1 - DTR))
      unknownTotSec = knownTotSec / (1 - dtrValue);
      unknownLabel = "trt-label";

      // Calculate FC
    } else if (known === "trt-input") {
      // FC = ((-TRT * DTR) + TRT)
      unknownTotSec = -knownTotSec * dtrValue + knownTotSec;
      unknownLabel = "fc-label";
    }

    // Calculate unknown time variable minutes
    // Add '0' before to ensure correct formating
    unknownValue[0] = "0" + Math.floor(unknownTotSec / 60);
    // Calculate unknown time variable seconds
    // Add '0' before to ensure correct formating
    unknownValue[1] = "0" + Math.floor(unknownTotSec - unknownValue[0] * 60);
    // Trim the string to keep the last two MINUTE characters. Ex: '025' -> '25' ... '08' -> '08'
    unknownValue[0] = unknownValue[0].slice(-2);
    // Trim the string to keep the last two SECOND characters. Ex: '025' -> '25' ... '08' -> '08'
    unknownValue[1] = unknownValue[1].slice(-2);
    // Create a string and format for DOM display
    unknownVariableString = unknownValue.join(":");

    //Remove the unknown time variable label from the input field
    document.getElementById(unknownLabel).textContent = "";
    // Reset unknown time variable input field to empty
    document.getElementById(unknown).value = "";
    //Change the unknown time variable input to display calculated value
    document.getElementById(unknown).value = unknownVariableString;

    //Set Calc flag for the unknown time variable to true (either 'fc-input' or 'trt-input')
    calcFlag = unknown;

    // Update isComplete
    isComplete();
  };

  /////////////////////////////////////////////////////////////////////////
  /* ---------- Removes any calculated values and class labels ----------*/
  const removeCalculated = (input) => {
    //Variables for input fields
    const inputFields = [
      document.getElementById("fc-input"),
      document.getElementById("trt-input"),
      document.getElementById("dtr-input")
    ];

    // Check to see which field has the calculated display (if any)
    const calcElement = document.getElementById(calcFlag);

    // If the number of completed fields is euqal to THREE...
    if (completedFields.numCompleted === 3) {
      // If the user focused on the input field with the calculated value...
      if (
        input !== undefined &&
        input.parentNode.classList.contains("calculate")
      ) {
        // Remove the class 'calculate' on the selected input field
        calcElement.parentNode.classList.remove("calculate");
        // Delete all values in all input fields
        inputFields.forEach((element) => {
          inputFieldReset(element);
        });
        // Set 'calcFlag' to false
        calcFlag = false;
        // Focus on that input field
        input.focus();
      }

      // If the number of completed fields is euqal to TWO...
    } else if (completedFields.numCompleted === 2) {
      // If the user focused on the input field with the calculated value...
      if (
        input !== undefined &&
        input.parentNode.classList.contains("calculate")
      ) {
        // Remove the class 'calculate' on the selected input field
        calcElement.parentNode.classList.remove("calculate");
        // Delete all values in all input fields
        inputFields.forEach((element) => {
          inputFieldReset(element);
        });
        // Focus on that input field
        input.focus();
        // Set 'calcFlag' to false
        calcFlag = false;
        // If the user made any changes that would (practically) create only ONE completed field
      } else {
        console.log(completedFields.numCompleted);
        // Remove the class 'calculate' on the selected input field
        calcElement.parentNode.classList.remove("calculate");
        // Reset the input field containing/displaying the calculated value
        inputFieldReset(calcElement);
        // Set 'calcFlag' to false
        calcFlag = false;
      }
    }
  };

  /////////////////////////////////////////////
  /* ---------- Reset input fields ----------*/
  const inputFieldReset = (input) => {
    input.value = "";
    clearLabel(input);
    isComplete(input);
  };

  /////////////////////////////////////////////
  /* ---------- Cleave.js Library ---------- */
  /* ---------- For Input Masking ---------- */
  var fc = new Cleave("#fc-input", {
    time: true,
    timePattern: ["h", "m"]
  });

  var trt = new Cleave("#trt-input", {
    time: true,
    timePattern: ["h", "m"]
  });

  var dtr = new Cleave("#dtr-input", {
    numericOnly: true,
    delimiter: ".",
    blocks: [2, 2]
  });

  /////////////////////////////////////////////
  /* ---------- '?' About Section ---------- */
  // About window div variable
  const aboutOverlay = document.getElementById('about-overlay');
  $(aboutOverlay).hide();

  // If ESCAPE key is pressed when the ABOUT window is shown...
  $(document).keyup(function(input) {
    // escape key maps to keycode `27`
    if (input.key === "Escape" && aboutIsShown) {
      // Toggle the ABOUT window (Effectively closing the window)
      toggleAboutWindow();
    }
  });


  const toggleAboutWindow = () => {
    if (aboutIsShown) {
      fadeOut(aboutOverlay);
    } else if (!aboutIsShown) {
      fadeIn(aboutOverlay);
    }
  }

  // Function to FADE IN element...
  const fadeIn = (input) => {
    $(input).fadeIn(500, function() {
      $(input).css('opacity', 1);
    });
    // Flag the about window as being shown
    aboutIsShown = true;

    // Scroll to the top of the page...
    // For Safari
    //document.body.scrollTop = 0;
    // For Chrome, Firefox, IE and Opera
    //document.documentElement.scrollTop = 0;
  }

  // Function to FADE OUT element...
  const fadeOut = (input) => {
    $(input).fadeOut(500, function() {
      $(input).css('opacity', 1);
    });
    // Flag the about window as NOT being shown
    aboutIsShown = false;
  }
})
