function resetScreen() {
    const content = document.querySelector(".content");
    const footer = document.querySelector(".footer");

    while (content.firstElementChild) {
        content.removeChild(content.firstElementChild);
    }

    while (footer.firstElementChild) {
        footer.removeChild(footer.firstElementChild);
    }

    footer.textContent = "";
}

function displaySelection(scores) {
    resetScreen();

    // Reinitializing the player and computer selections
    scores[0][0] = scores[1][0] = "";

    const content = document.querySelector(".content");
    const footer = document.querySelector(".footer");

    // Adding the title
    const title = document.createElement("h1");
    title.textContent = "Choose your weapon!";
    content.appendChild(title);

    // Adding a section of options to choose from
    const selections = document.createElement("div");
    selections.className = "selections";
    content.appendChild(selections);

    // ROCK
    const rockContainer = document.createElement("div");
    rockContainer.id = "rock";
    selections.appendChild(rockContainer);

    const rockImage = document.createElement("img");
    rockImage.src = "images/rock.png";
    rockImage.alt = "Rock";
    rockContainer.appendChild(rockImage);

    const rockButton = document.createElement("button");
    rockButton.textContent = "Rock";
    rockContainer.appendChild(rockButton);

    // PAPER
    const paperContainer = document.createElement("div");
    paperContainer.id = "paper";
    selections.appendChild(paperContainer);

    const paperImage = document.createElement("img");
    paperImage.src = "images/paper.png";
    paperImage.alt = "Paper";
    paperContainer.appendChild(paperImage);

    const paperButton = document.createElement("button");
    paperButton.textContent = "Paper";
    paperContainer.appendChild(paperButton);

    // SCISSORS
    const scissorsContainer = document.createElement("div");
    scissorsContainer.id = "scissors";
    selections.appendChild(scissorsContainer);

    const scissorsImage = document.createElement("img");
    scissorsImage.src = "images/scissors.png";
    scissorsImage.slt = "Scissors";
    scissorsContainer.appendChild(scissorsImage);

    const scissorsButton = document.createElement("button");
    scissorsButton.textContent = "Scissors";
    scissorsContainer.appendChild(scissorsButton);

    // Update the footer to display the current player and computer score.
    footer.setAttribute("id", "score");

    const playerScore = document.createElement("div");
    playerScore.id = "score player";
    playerScore.textContent = "Your Score: " + scores[0][1];
    footer.appendChild(playerScore);

    const computerScore = document.createElement("div");
    computerScore.id = "score computer";
    computerScore.textContent = "Computer Score: " + scores[1][1];
    footer.appendChild(computerScore);
}

function displayResults(scores) {
    resetScreen();

    getComputerSelection(scores);
    const playerSelection = scores[0][0];
    const computerSelection = scores[1][0];

    const winner = getRoundWinner(scores);
    const playerScore = scores[0][1];
    const computerScore = scores[1][1];

    const content = document.querySelector(".content");

    // Display the results - Image, Selection and Score under each player.
    const results = document.createElement("div");
    results.className = "results";
    content.appendChild(results);

    // PLAYER
    const playerDetails = document.createElement("div");
    playerDetails.id = "player";
    results.appendChild(playerDetails);

    const playerSelectionImage = document.createElement("img");
    if (playerSelection === "Rock") {
        playerSelectionImage.src = "images/rock.png";
    } else if (playerSelection === "Paper") {
        playerSelectionImage.src = "images/paper.png";
    } else if (playerSelection === "Scissors") {
        playerSelectionImage.src = "images/scissors.png";
    }
    playerDetails.appendChild(playerSelectionImage);

    const playerTitle = document.createElement("div");
    playerTitle.textContent = "Player:";
    playerTitle.id = "player-title";
    playerDetails.appendChild(playerTitle);

    const playerSelectionText = document.createElement("div");
    playerSelectionText.textContent = "Selection: " + playerSelection;
    playerDetails.appendChild(playerSelectionText);

    const playerScoreText = document.createElement("div");
    playerScoreText.textContent = "Score: " + playerScore;
    playerDetails.appendChild(playerScoreText);

    // COMPUTER
    const computerDetails = document.createElement("div");
    computerDetails.id = "computer";
    results.appendChild(computerDetails);

    const computerSelectionImage = document.createElement("img");
    if (computerSelection === "Rock") {
        computerSelectionImage.src = "images/rock.png";
    } else if (computerSelection === "Paper") {
        computerSelectionImage.src = "images/paper.png";
    } else if (computerSelection === "Scissors") {
        computerSelectionImage.src = "images/scissors.png";
    }
    computerDetails.appendChild(computerSelectionImage);

    const computerTitle = document.createElement("div");
    computerTitle.textContent = "Computer:";
    computerTitle.id = "computer-title";
    computerDetails.appendChild(computerTitle);

    const computerSelectionText = document.createElement("div");
    computerSelectionText.textContent = "Selection: " + computerSelection;
    computerDetails.appendChild(computerSelectionText);

    const computerScoreText = document.createElement("div");
    computerScoreText.textContent = "Score: " + computerScore;
    computerDetails.appendChild(computerScoreText);

    // Add h2 and h1 to display winner.
    const preHeader = document.createElement("h2");
    preHeader.textContent = "And the winner is...";
    content.appendChild(preHeader);

    const header = document.createElement("h1");
    if (winner === "player") {
        header.textContent = "You are! You win!"
    } else if (winner === "computer") {
        header.textContent = "The computer... womp womp."
    } else {
        header.textContent = "It's a tie! Good game!";
    }
    content.appendChild(header);

    // Add replay button
    const replayButton = document.createElement("button");
    replayButton.id = "replay-button";
    replayButton.textContent = "Play again?";
    replayButton.addEventListener("click", () => {
        startGame(scores);
    });
    content.appendChild(replayButton);

    // Reformat footer
    const footer = document.querySelector(".footer");
    footer.textContent = "Thank you for playing!";
    footer.id = "results";
}

function getPlayerSelection(scores) {
    const rockButton = document.querySelector("#rock");
    const paperButton = document.querySelector("#paper");
    const scissorsButton = document.querySelector("#scissors");

    rockButton.addEventListener("click", () => {
        scores[0][0] = "Rock";
        displayResults(scores);
    });
    paperButton.addEventListener("click", () => {
        scores[0][0] = "Paper";
        displayResults(scores);

    });
    scissorsButton.addEventListener("click", () => {
        scores[0][0] = "Scissors";
        displayResults(scores);
    });
}

// Randomizes computer's selection between 1, 2 and 3 as Rock, Paper and Scissors respectively.
function getComputerSelection(scores) {
    const randomNumber = Math.floor(Math.random() * 3);
    scores[1][0] = randomNumber == 1 ? "Rock" : randomNumber == 2 ? "Paper" : "Scissors";
}

function getRoundWinner(scores) {
    let playerSelection = scores[0][0];
    let computerSelection = scores[1][0];

    if (playerSelection === computerSelection) {
        return "tie";
    } else if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Paper" && computerSelection === "Rock") ||
        (playerSelection === "Scissors" && computerSelection === "Paper")) {
        //Increase player score
        scores[0][1]++;
        return "player";
    } else {
        //Increase computer score
        scores[1][1]++;
        return "computer";
    }
}

function startGame(scores) {
    displaySelection(scores);
    getPlayerSelection(scores);
}

// [playerSelection, playerScore], 
// [computerSelection, computerScore]
let selectionsAndScores = [
    ["", 0],
    ["", 0]
];

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    startGame(selectionsAndScores);
});