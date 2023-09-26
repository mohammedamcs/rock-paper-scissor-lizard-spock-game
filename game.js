// Query Selectors
const userSelectionResult = document.getElementById("user");
const computerSelectionResult = document.getElementById("computer");
const resultMsg = document.querySelector(".msg span");
const actionsContainer = document.querySelector(".actions");

// Global Variables
let userSelection, computerSelection;
let timeOutId;
const selections = ["rock", "paper", "scissors", "lizard", "spock"];
const damagedBy = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["rock", "scissors"],
};

// Event Listener
actionsContainer.addEventListener("click", handleClick);

function handleClick(e) {
  // Extract name
  const { name } = e.target;

  // Check if name exist
  if (name) {
    userSelection = name;
    computerSelection =
      selections[Math.floor(Math.random() * selections.length)];
    // Update Result
    updateResult();
    let result = "";
    // Check who won
    if (userSelection === computerSelection) {
      // with draw
      result = "draw";
    } else if (checkBattle()) {
      // User Won
      result = "won";
    } else {
      // Computer Won
      result = "loose";
    }
    updateResultMessage(result);
  }
}

function updateResult() {
  userSelectionResult.src = `images/${userSelection}.png`;
  userSelectionResult.alt = `${userSelection}.png`;
  computerSelectionResult.src = `images/${computerSelection}.png`;
  computerSelectionResult.alt = `${computerSelection}.png`;
}

function checkBattle() {
  return (
    damagedBy[userSelection][0] === computerSelection ||
    damagedBy[userSelection][1] === computerSelection
  );
}

function updateResultMessage(type) {
  clearTimeout(timeOutId);
  resultMsg.className = type;
  switch (type) {
    case "draw":
      resultMsg.innerHTML = "Draw!";
      break;

    case "won":
      resultMsg.innerHTML = "You Won!";
      break;

    case "loose":
      resultMsg.innerHTML = "Computer Won!";
      break;

    default:
      break;
  }

  timeOutId = setTimeout(() => {
    resultMsg.innerHTML = "";
    resultMsg.className = "";
  }, 2000);
}
