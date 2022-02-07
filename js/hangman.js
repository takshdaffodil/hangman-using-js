const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

let wrongGuessed = 0;
let maxWrong = 6;
let answer = "";
let guessed = [];
let ansStatus = null;

const randomState = () => {
  answer =
    indianStates[Math.floor(Math.random() * indianStates.length)].toLowerCase();
};

const displayButtonKeyboard = () => {
  const buttons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((letter, index) => {
      return `
      <button
      class="btn btn-lg btn-success m-2"
      id='${letter}'
      onClick="handleGuess('${letter}')"
      >
      ${letter}
      </button>
      `;
    })
    .join("");
  document.getElementById("alphabets").innerHTML = buttons;
};

const handleGuess = (chosenLetter) => {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    wrongGuessed++;
    updateWrongGuessed();
    updateImage();
    checkGameLost();
  }
};
const guessedWord = () => {
  ansStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("words").innerHTML = ansStatus;
};

const updateImage = () => {
  document.getElementById("hangmanPic").src =
    "./assets/" + wrongGuessed + ".jpg";
  console.log("./assets/" + wrongGuessed + ".jpg");
};

const checkGameWon = () => {
  if (ansStatus === answer) {
    document.getElementById("alphabets").innerHTML = "You won the game!";
  }
};

const checkGameLost = () => {
  if (wrongGuessed === maxWrong) {
    document.getElementById("alphabets").innerHTML = "You lost!";
    document.getElementById("words").innerHTML = `The answer was ${answer}. `;
  }
};

const updateWrongGuessed = () => {
  document.getElementById("wrongGuessed").innerHTML = wrongGuessed;
};

const reset = () => {
  wrongGuessed = 0;
  guessed = [];

  randomState();
  guessedWord();
  updateWrongGuessed();
  displayButtonKeyboard();
  updateImage();
};

document.getElementById("maxWrong").innerHTML = maxWrong;

randomState();
displayButtonKeyboard();
guessedWord();
