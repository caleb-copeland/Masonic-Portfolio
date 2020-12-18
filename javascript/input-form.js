/* ---------- Variables ---------- */
//Submit button pressed yet?
let submitPressed = false;

/* ---------- Animation ---------- */
//Animation on MOUSEOVER
document.addEventListener(
  "mouseover",
  (event) => {
    event.target.parentNode.classList.add("hover");
  },
  false
);

//Animation on MOUSEOUT
document.addEventListener(
  "mouseout",
  (event) => {
   if (event.target !== undefined) { event.target.parentNode.classList.remove("hover");
  }
  },
  false
);

//Animation on FOCUSIN
document.addEventListener(
  "focusin",
  (event) => {
    event.target.parentNode.classList.add("focus");
  },
  false
);

//Animation on FOCUSOUT
document.addEventListener(
  "focusout",
  (event) => {
    //Check if the input is black (or only spaces)
    if (isEmpty(event.target) === true) {
      event.target.value = ""; //Deletes input if only spaces were entered
      event.target.parentNode.classList.remove("focus");
    }
    //Send the user's selected input field to get validated
    validateInput(event.target);
  },
  false
);

//Function runs when AUTOFILL occurs
const onAutoFillStart = (element) => {
  element.parentNode.classList.add(focus);
}

/* ---------- Validation ---------- */
// Validate the individual fields
const validateInput = (input) => {
  const inputId = input.getAttribute("id");
  const inputClass = input.getAttribute("class");

  //Validation for the NAME input field
  if (inputId === "fname") {
    if (submitPressed === false) {
      //Runs if submit has yet to be pressed
      if (isEmpty(input) === false) {
        addValidMessage(input);
      } else {
        removeValidMessage(input);
      }
    } else {
      //Runs if submit HAS been pressed
      if (isEmpty(input) === true) {
        addErrorMessage(input, 1);
      } else {
        addValidMessage(input);
      }
    }
    //Validation for the EMAIL input field
  } else if (inputId === "femail") {
    //Runs if submit HAS NOT been pressed yet
    if (submitPressed === false) {
      if (isEmpty(input) === true) {
        removeValidMessage(input);
        removeErrorMessage(input);
      } else if (isEmail(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 3);
      }
    } else {
      //Runs if submit HAS been pressed
      if (isEmpty(input) === true) {
        addErrorMessage(input, 2);
      } else if (isEmail(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 3);
      }
    }
    //Validation for the PHONE-NUMBER input field
  } else if (inputId === "fphone") {
    //Runs if submit HAS NOT been pressed yet
    if (submitPressed === false) {
      if (isEmpty(input) === true) {
        removeValidMessage(input);
        removeErrorMessage(input);
      } else if (isPhoneNumber(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 5);
      }
    } else {
      //Runs if submit HAS been pressed
      if (isEmpty(input) === true) {
        addErrorMessage(input, 4);
      } else if (isPhoneNumber(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 5);
      }
    }
    //Validation for the WEBSITE input field
  } else if (inputId === "fwebsite") {
    //Runs if submit HAS NOT been pressed yet
    if (submitPressed === false) {
      if (isEmpty(input) === true) {
        removeValidMessage(input);
        removeErrorMessage(input);
      } else if (isURL(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 7);
      }
    } else {
      //Runs if submit HAS been pressed
      if (isEmpty(input) === true) {
        addErrorMessage(input, 6);
      } else if (isURL(input) === true) {
        addValidMessage(input);
      } else {
        addErrorMessage(input, 7);
      }
    }
    //Validation for the MESSAGE input field
  } else if (inputId === "fmessage") {
    //Runs if submit HAS NOT been pressed yet
    if (submitPressed === false) {
      if (isEmpty(input) === false) {
        addValidMessage(input);
      } else {
        removeValidMessage(input);
      }
    } else {
      //Runs if submit HAS been pressed
      if (isEmpty(input) === true) {
        addErrorMessage(input, 8);
      } else {
        addValidMessage(input);
      }
    }
  }
};

//Function to check if an input field is empty (or just spaces)
const isEmpty = (input) => {
  //If the input (minus the spaces) has any value...
  if (input.value.trim()) {
    return false;
  } else {
    return true;
  }
};

//Function to check if the user's EMAIL input follows an 'email' format
const isEmail = (input) => {
  //Regular expression for 'email'
  const emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //If input follows format... return true
  if (input.value.match(emailFormat)) {
    return true;
  } else {
    return false;
  }
};

//Function to check if the user's PHONE-NUMBER input follows a 'phone-number' format
const isPhoneNumber = (input) => {
  //Regular expression for 'phone-number'
  const phoneNumber = input.value.replace(/\D/g, "");
  const phoneNumberFormat = /^(?:\+?1[-.●]?)?\(?([2-9][0-8][0-9])\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
  //If input follows format... return true
  if (phoneNumber.match(phoneNumberFormat)) {
    return true;
  } else {
    return false;
  }
};

//Function to check if the user's PHONE-NUMBER input follows a 'url' format
const isURL = (input) => {
  //Regular expression for a 'url'
  const urlFormat = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  //If input follows format... return true
  if (input.value.match(urlFormat)) {
    return true;
  } else {
    return false;
  }
};

//Function to add a validation check mark
const addValidMessage = (input) => {
  //Remove any class 'invalid'
  removeErrorMessage(input);
  //Variable for the status container div under the input
  const statusContainer = input.parentNode.querySelector(".status-container");
  //Add the class 'error' to the error container div
  statusContainer.classList.add("valid");
  //Alter inner html of the status container div
  statusContainer.innerHTML = "✔";
};

const removeValidMessage = (input) => {
  //Variable for the status container div under the input
  const statusContainer = input.parentNode.querySelector(".status-container");
  //Remove any class 'invalid'
  statusContainer.classList.remove("valid");
  //Alter inner html of the status container div
  statusContainer.innerHTML = "";
};

//Function to add an error message
const addErrorMessage = (input, code) => {
  //Remove any class 'valid'
  removeValidMessage(input);
  //Variable for the status container div under the input
  const statusContainer = input.parentNode.querySelector(".status-container");
  //Add the class 'error' to the status container div
  statusContainer.classList.add("error");
  //Define specific error message
  const newMessage = errorCodes(code);
  // Alter inner html of the status container div
  statusContainer.innerHTML = newMessage;
};

//Function to remove error messsage
const removeErrorMessage = (input) => {
  //Variable for the status container div under the input
  const statusContainer = input.parentNode.querySelector(".status-container");
  //Delete any inner HTML text in the status container div
  statusContainer.innerHTML = "";
  //Remove the class 'error' to the status container div
  statusContainer.classList.remove("error");
};

//Function defines what each error code will display
const errorCodes = (code) => {
  switch (code) {
    case 0:
      return null;
      break;
    case 1:
      return "Woops! Please enter your name! ───┘";
      break;
    case 2:
      return "Dang! Please enter your e-mail! ───┘";
      break;
    case 3:
      return "Please enter a valid e-mail address ───┘";
      break;
    case 4:
      return "Snap! Please enter your phone number! ───┘";
      break;
    case 5:
      return "Please enter a valid phone number ───┘";
      break;
    case 6:
      return "Drat! Please enter your website's url! ───┘";
      break;
    case 7:
      return "Please enter a valid url ───┘";
      break;
    case 8:
      return "WHOA THERE! Please type your message! ───┘";
      break;
    default:
      "";
      break;
  }
};

/* ---------- Form Submit ---------- */
// Submit button on CLICK
document.addEventListener(
  "click",
  (event) => {
    //If the target clicked on was the submit button...
    if (event.target.getAttribute("id") === "fsubmit") {
      //If all the inout fields have class 'valid'...
      if (
        document.getElementsByClassName("valid") != null &&
        document.getElementsByClassName("valid").length === 5
      ) {
        //SUBMIT THE FORM
        document.contactForm.submit(); //Submits Form
      } else {
        //If all the input fields are not valid...
        submitPressed = true;
        //Set a variable to hold all the input fields in an array
        const inputs = document.getElementsByClassName("text-input");
        //Loop through all the inputs and run them through the validation
        for (let i = 0; i < 5; i++) {
          validateInput(inputs[i]);
        }
      }
    }
  },
  false
);
