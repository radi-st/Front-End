"use strict";

var guesses = 0;

function startGameClicked(button) {
  button.style.display = "none";
  let gameDiv = document.createElement("div");
  document.getElementById("game-div").appendChild(gameDiv);
  //positioning
  gameDiv.style.display = "flex";
  gameDiv.style.flexDirection = "column";
  gameDiv.style.justifyContent = "center";
  //input
  let inputDiv = document.createElement("div");
  gameDiv.appendChild(inputDiv);

  let numberForm = document.createElement("form");
  inputDiv.appendChild(numberForm);
  numberForm.style.display = "flex";
  numberForm.style.flexDirection = "column";
  numberForm.style.alignItems = "center";
  numberForm.setAttribute("onsubmit", "event.preventDefault(); validateMyForm();");



  let inputNumber = document.createElement("input");
  inputNumber.setAttribute("type", "text");
  inputNumber.setAttribute("name", "guessednumber");
  inputNumber.setAttribute("id", "guessednumber");
  numberForm.appendChild(inputNumber);

  inputNumber.classList.add("start-game");
  inputNumber.style.textAlign = "center";
  inputNumber.focus();
  inputNumber.style.borderRadius = "10px";
  inputNumber.style.marginBottom = "10px";
  inputNumber.style.fontSize = "3rem";



  let submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Guess");
  numberForm.appendChild(submitButton);
  submitButton.classList.add("start-game");
  submitButton.style.textAlign = "center";
  submitButton.focus();
  submitButton.style.borderRadius = "100px";
  submitButton.style.maxWidth = "10rem";

  /*
    let numberInput = document.createElement("INPUT");
    numberInput.setAttribute("type", "text");
    
    inputDiv.appendChild(numberInput);
    
  */
  //guesses
  let guessText = document.createElement("P");
  guessText.setAttribute("id", "timesguessed");
  guessText.innerText = `Times Guessed:  ${guesses}`;
  gameDiv.appendChild(guessText);
  guessText.style.fontSize = "2rem";
  guessText.style.color = "white";
  guessText.style.background = "black";
  guessText.style.borderRadius = "50px";
  guessText.style.textAlign = "center";



}

function different4Digits(number) {
  let arr = Array.from(String(number), Number);
  let filtered_arr = arr.filter((v, i, a) => a.indexOf(v) === i);
  return arr.length === filtered_arr.length;

}



function validateMyForm() {
  let number = document.getElementById("guessednumber").value;
  if (isNaN(+number) || (+number < 1000) || (number.length !== 4) || !different4Digits(number)) {
    alert("Number must be 4 digits, all unique, and must be a natural number!");
  } else {
    guesses += 1;
    document.getElementById("timesguessed").innerText = `Times Guessed:  ${guesses}`;
    afterGuess(number);
  }
  return false;
}

function BullsCows(guess, secret) {
  //bulls на правилно място
  //cow правилна цифра на грешно място

  let cows = 0;
  let bulls = 0;
  let gArr = Array.from(String(guess), Number);
  let sArr = Array.from(String(secret), Number);
  for (let i = 0; i < 4; i++) {
    if (gArr[i] === sArr[i]) {
      bulls++;
    } else {
      for (let j = 0; j < 4; j++) {
        if (gArr[i] === sArr[j] && j != i) {
          cows++;
        }
      }
    }
  }

  return {
    bulls: bulls,
    cows: cows
  };
}

function afterGuess(number) {
  let {
    bulls,
    cows
  } = BullsCows(number, numberToGuess);
  let animals = document.getElementById("farm");
  if (animals === null) {
    
    animals = document.createElement("div");
    animals.setAttribute("id", "farm");
    document.getElementById("game-div").prepend(animals);
  } else {
    animals.innerHTML = "";
  }
  for (let i = 1; i <= bulls; i++) {
    let img = document.createElement("IMG");
    img.setAttribute("src", "./resources/bull.gif");
    animals.appendChild(img);
    img.style.maxWidth = "150px";
    img.style.maxHeight = "auto";
  }

  for (let i = 1; i <= cows; i++) {
    let img = document.createElement("IMG");
    img.setAttribute("src", "./resources/cow.gif");
    animals.appendChild(img);
  }

  //alert(`Bulls: ${bulls}; Cows: ${cows}`);

}

var numberToGuess;
do {
  numberToGuess = Math.floor(1000 + Math.random() * 9000);
} while (!different4Digits(numberToGuess));