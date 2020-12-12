$(document).ready(function() {
  ///////////////////////////////////////////////////
//---------- Initialize Global Variables ----------//

// Variables hold the location of the 'game board'
const board = document.querySelector(".board");

// Squiggle card back URL
const cardBack = "https://i.imgur.com/SnxWtyy.png";
// Potential Card Face symbols
const cardFaceSymbols = [
  "#", "&", "+", "×", "Δ", "∇", "⌑", "⌾", "•", "⌺", "⌻", "⌼", "⌸", "⌹", "〣", "☰", "☲", "☵", "⑇", "⑈", "⑆", "⑉", "〄",
];

// Object to save the user's choice of cards, number of attempts, and nbumber of matches during the game
var cardsFlipped = {
  _cardChoice: [],
  _numOfAttempts: 0,
  _numOfMatches: 0,
  // Getter Methods
  get cardChoice() {
    return this._cardChoice;
  },
  get numOfAttempts() {
    return this._numOfAttempts;
  },
  get numOfMatches() {
    return this._numOfMatches;
  },
  // Setter Methods
  set cardChoice(input) {
    this._cardChoiceOne = input;
  },
  set numOfAttempts(input) {
    this._numOfAttempts = input;
  },
  set numOfMatches(input) {
    this._numOfMatches = input;
  }
};

// Object to set up the game board. Also holds the 'Card Deck' which is created in the function 'createBoard()'
var Board = {
  _numRows: 4,
  _numColumns: 4,
  _cardDeck: [],
  // Getters
  get numRows() {
    return this._numRows;
  },
  get numColumns() {
    return this._numColumns;
  },
  get cardDeck() {
    return this._cardDeck;
  },
  //Setters
  set numRows(num) {
    this._numRows = num;
  },
  set numColumns(num) {
    this._numColumns = num;
  },
  set cardDeck(newCard) {
    this._cardDeck = newCard;
  }
};

// Card class to define what information a 'card' holds
class Card {
  constructor(position, symbol, flipped) {
    // When a card is created the position will be entered as another object
    // {row: ##, column: ##}
    this._position = position;
    this._cardFace = symbol;
  }
  // Getters
  get position() {
    return this._position;
  }
  get cardFace() {
    return this._cardFace;
  }
  // Setters
  set position(obj) {
    this._position = obj;
  }
  set cardFace(symbol) {
    this._cardFace = symbol;
  }
}

//////////////////////////////////////////////////////
//---------- Function to shuffle an array ----------//
const shuffle = (input) => {
  let remainingElements = input.length,
    currentElement,
    randomElement;

  // If there are still elements left to shuffle
  while (remainingElements) {
    // Pick an element that still needs shuffling
    randomElement = Math.floor(Math.random() * remainingElements--);

    // And swap it with the current element.
    currentElement = input[remainingElements];
    input[remainingElements] = input[randomElement];
    input[randomElement] = currentElement;
  }
  return input;
};

//////////////////////////////////////////////////////////////////
//---------- Create all the cards needed for the game ----------//
//----------- Uses the Board.height and Board.width ------------//
//--------- to determin the number of cards to create. ---------//
const createCards = () => {
  // Initialize variables so that the game board is cleared,
  // and all records of previous games (if any) are also cleared
  Board.cardDeck.length = 0;
  cardsFlipped.cardChoice.length = 0;
  cardsFlipped.numOfAttempts = 0;
  cardsFlipped.numOfMatches = 0;

  // Shuffles the symbols in their array and slices off the unneeded elements...
  // Shuffling all the symbols ensures that every game uses different symbols.
  // NEEDED elements = (#ofRows x #ofColumns) / 2
  // Divide by two since there are two of each symbol
  let shuffledCardFaceSymbols = shuffle(cardFaceSymbols).slice(
    0,
    (Board.numRows * Board.numColumns) / 2
  );

  // Duplicates the array so that there are two of each symbol
  shuffledCardFaceSymbols.forEach((element) =>
    shuffledCardFaceSymbols.push(element)
  );
  // Shuffle the array once more so that the symbols are placed completely randomly in the array
  shuffledCardFaceSymbols = shuffle(shuffledCardFaceSymbols);

  // Counts number of iterations through the FOR loop
  let counter = 0;

  // Loops through the row...
  for (let i = 0; i < Board.numRows; i++) {
    // Declares 'Board.cardDeck' as a 2d array
    Board.cardDeck[i] = [];
    // Loops through the column...
    for (let j = 0; j < Board.numColumns; j++) {
      // Creates a new onbject from the "CARD" class.
      // Assigns an object to position with row and column #'s based on loop iterations.
      // TWO of each card face assigned through the symbol array starting at the beginning and ending at the total number of needed cards.
      // Since the cardFaceSymbols have been shuffled the outcome will be different every game.
      Board.cardDeck[i][j] = new Card(
        { row: i, column: j },
        shuffledCardFaceSymbols[counter]
      );
      // Incriment up every iteration.
      counter++;
    }
  }
};

///////////////////////////////////////////////////////////
//---------- Function to create the GAME BOARD ----------//
const createBoard = () => {
  // Initialize variables
  let boardRow = [];
  let counter = 0;

  // Create a new row for every interation of 'i'...
  // Each row will be assigned FOUR 'cards' in the nested loop...
  for (let i = 0; i < Board.numRows; i++) {
    boardRow[i] = document.createElement("div");
    boardRow[i].setAttribute("class", "board-Row");
    boardRow[i].setAttribute("class", "flex-row");
    board.appendChild(boardRow[i]);

    // Create new 'columns' for every interation of 'j'
    // These are the 'cards'.
    for (let j = 0; j < Board.numColumns; j++) {
      var card = document.createElement("div");
      card.style.backgroundImage = "url(" + cardBack + ")";
      card.setAttribute("class", "card-display flex-column unselectable");
      card.setAttribute("row-id", i);
      card.setAttribute("column-id", j);
      // Shhhhhhh... Don't tell.
      var shh = document.createElement('p');

      // When the card is hovered over by the mouse...
      card.addEventListener(
        "mouseover",
        function () {
          // If the card HAS NOT been flipped yet...
          if (!this.classList.contains("card-flipped")) {
            // Add the class 'hover' to the card
            this.classList.add("hover");
            // Special Sauce Here
            if (cardsFlipped.cardChoice[0] != undefined) {
              if (Board.cardDeck[event.target.getAttribute("row-id")][
                event.target.getAttribute("column-id")
              ].cardFace === cardsFlipped.cardChoice[0].symbol) {
                shh.id = 'secret';
                shh.style.position="absolute"; shh.style.top="-25px"; shh.style.right ="-25px"; shh.style.color="#f2f2f2"; shh.style.fontSize="0.4rem";
                shh.textContent = '.'
                board.appendChild(shh);
              }
            }
          }
        },
        false
      );

      // When the mouse leaves the card area and IS NOT hovering any longer...
      card.addEventListener(
        "mouseout",
        function () {
          // Remove the class 'hover' from the card
          this.classList.remove("hover");
          // Special Sauce Gone
          shh.remove();
        },
        false
      );

      // If the card is clicked on...
      card.addEventListener(
        "click",
        (event) => {
          // If the card HAS NOT been flipped  - AND - the user HAS NOT flipped two cards yet...
          if (!event.target.getAttribute("flipped") && cardsFlipped.cardChoice.length < 2) {
            // Flip the card the user clicked on
            flipCard(event.target);
          }
        },
        false
      );

      // Add the current CARD to the current BOARD ROW
      boardRow[i].appendChild(card);
    }
  }
  //boardOverlay("completed"); // Test the "completed" screen by uncommenting this line!!!
};

/////////////////////////////////////////////////////////////////
//---------- Function to display the card as FLIPPED ----------//
flipCard = (input) => {
  // Declare Variables //
  // Set the 'flipped' attribute of the clicked card as TRUE
  input.setAttribute('flipped', 'true');

  // Variable to hold the CARD FACE SYMBOL of the selected card
  const flippedCardSymbol =
    Board.cardDeck[input.getAttribute("row-id")][
      input.getAttribute("column-id")
    ].cardFace;

  // Pushes an object that holds the selected card's DIV and SYMBOL to the cardFlipped.cardChoice array
  cardsFlipped.cardChoice.push({
    div: input,
    symbol: flippedCardSymbol
  });

  // Remove class 'hover' from the selected card
  input.classList.remove("hover");

  // Wait 600ms before...
  setTimeout (function () {
    // Sending 'flip' to boardOverlay() will create an invisible DIV
    // that prevents the user from selecting any new cards while the animation takes place
    boardOverlay ('flip');
    // Nested timeout... Wait 150ms before..
    setTimeout(function () {
      // Removes background image
      input.style.backgroundImage = "none";
      // Add class 'card-flipped' to the selected card
      input.classList.add("card-flipped");
      // Double nested timeout...
      setTimeout(function () {
        input.textContent =
          Board.cardDeck[input.getAttribute("row-id")][
          input.getAttribute("column-id")
        ].cardFace;
        if (cardsFlipped.cardChoice.length === 2) {
          checkForMatch();
        }
      }, 150);
    }, 600);
  })

};

const checkForMatch = () => {
  // Variables for the location of the flipped cards on the board
  const cardChoiceOne = cardsFlipped.cardChoice[0];
  const cardChoiceTwo = cardsFlipped.cardChoice[1];
  // Increment total number of attempts
  cardsFlipped.numOfAttempts++;

  if (cardChoiceOne.symbol === cardChoiceTwo.symbol) {
    // Increment total number of matches
    cardsFlipped.numOfMatches++;
    if (cardsFlipped.numOfMatches === (Board.numRows * Board.numColumns) /2) {
      cardChoiceOne.div.classList.add('wiggle');
      cardChoiceTwo.div.classList.add('wiggle');
      setTimeout(function(){
        boardOverlay('completed');
      }, 1500);
    } else {
      cardChoiceOne.div.classList.add('wiggle');
      cardChoiceTwo.div.classList.add('wiggle');
    }
  } else {
      setTimeout(function () {
        cardChoiceOne.div.textContent = '';
        cardChoiceOne.div.style.backgroundImage = "url(" + cardBack + ")";
        cardChoiceTwo.div.textContent = '';
        cardChoiceTwo.div.style.backgroundImage = "url(" + cardBack + ")";
        setTimeout(function () {
          cardChoiceOne.div.classList.remove("card-flipped");
          cardChoiceTwo.div.classList.remove("card-flipped");
          cardChoiceOne.div.removeAttribute('flipped');
          cardChoiceTwo.div.removeAttribute('flipped');
        }, 150);
      }, 600);
    }
  // Reset the card choice variable
  cardsFlipped.cardChoice.length = 0;
};

const boardOverlay = (input) => {
  const boardOverlay = document.createElement("div");
  boardOverlay.id = 'board-overlay';

  board.appendChild(boardOverlay);

  if (input === 'flip') {
    setTimeout (function () {
      boardOverlay.remove()
    }, 700);
  }

  if (input === 'completed') {
    const messageHeading = document.createElement("h1");

    boardOverlay.style.backgroundColor = "#F2BEA0";
    messageHeading.id = "completed-heading"
    messageHeading.textContent = '¡Completed!';
    boardOverlay.appendChild(messageHeading);

    const messageCount = document.createElement('div');
    messageCount.id = 'message-count';
    messageCount.innerHTML = `You Found All The Pairs In<br /><span id="attempts">—&nbsp&nbsp${cardsFlipped.numOfAttempts}&nbsp&nbsp—</span><br />Attempts`;
    boardOverlay.appendChild(messageCount);

    const tryAgainButton = document.createElement('button');
    tryAgainButton.id = "try-again-button";
    tryAgainButton.innerHTML = 'Try Again?';
    boardOverlay.appendChild(tryAgainButton);
    tryAgainButton.addEventListener(
      'click',
      function() {
        boardOverlay.remove();
        board.innerHTML = '';
        createCards();
        createBoard();
      }, false);
  }
}

createCards();
createBoard();

})
