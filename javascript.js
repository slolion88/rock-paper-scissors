// Rock Paper Scissors game, computer vs user, tracking scores for both

// Function to normalize the input received from the user
// Remove input string's whitespace and convert to all lower case
// Capitallize the first letter, separate from the initial string, then concatenate
// Returns string with no whitespace and first letter capitalized
function normalizeInput(input) {
    // Remove whitespace from input and make all lower case
    input = input.trim();
    input = input.toLowerCase();
    
    // Get the first letter and capitalize it
    let firstLetter = input.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    
    // Remove the first letter from the final string, then concatenate with uppercase first letter
    input = input.substring(1);
    return firstLetter.concat(input);
}

// Function to confirm the user's choice 
// If no valid choice given, reprompt until vallid choice received
// Returns the user's choice of Rock, Paper, or Scissors
function confirmUserChoice(choice) {
    choice = normalizeInput(choice);

    while (choice != "Rock" && choice != "Paper" && choice != "Scissors") {
        choice = prompt("Invalid entry, try again. Which do you choose? Enter \"rock\", \"paper\" or \"scissors\": ");
        choice = normalizeInput(choice);
    }

    return choice;
}

// Function to get computer's choice
// Get a random number (0-1) as multiple of 10, rounded down. Gives an integer, 0-9.
// If 0, will loop until another number received. 1-3 is Rock, 4-6 is Paper, 7-9 is Scissors
// Returns the computer's choice of Rock, Paper, or Scissors
function getComputerChoice() {
    let randomNumber = 0; 
    while (randomNumber === 0) {
        randomNumber = Math.floor(Math.random() * 10);

        switch (randomNumber) {
            case 1: 
            case 2: 
            case 3:
                return "Rock";
            case 4:
            case 5:
            case 6:
                return "Paper";
            case 7: 
            case 8: 
            case 9:
                return "Scissors";
        }
    }
}

// Function to determine the round winner
// Rock ties with Rock, loses to Paper, beats Scissors
// Paper beats Rock, ties with Paper, loses to Scissors
// Scissors loses to Rock, beats Paper, ties with Scissors
function getRoundWinner(user, computer) {
     if (user === "Rock") {
        return computer === "Rock" ? "It was a tie! Good game!" : (computer === "Paper" ? "The Computer. Womp womp." : "You! You win!");
    } else if (user === "Paper") {
        return computer === "Rock" ? "You! You win!" : (computer === "Paper" ? "It was a tie! Good game!" : "The Computer. Womp womp.");
    } else {
        return computer === "Rock" ? "The Computer. Womp womp." : (computer === "Paper" ? "You! You win!" : "It was a tie! Good game!");
    }
}

// Initialize global variables, getting the user's choice. 
let userScore = computerScore = 0;
let userChoice = prompt(`
    Let's play Rock, Paper, Scissors! Which do you choose? 
    Type \"rock\", \"paper\", or \"scissors\" below: `
);
userChoice = confirmUserChoice(userChoice);

// Loops until the users advises they don't want to play anymore
while (userChoice != null) {
    // Get computer's choice
    let computerChoice = getComputerChoice();

    // Determine the winner and increase their score - Rock beats scissors, scissors beats paper, paper beats rock
    let roundWinner = getRoundWinner(userChoice, computerChoice);

    // Increase the winner's score
    if (roundWinner === "You! You win!") {
        userScore = ++userScore;
    } else if (roundWinner === "The Computer. Womp womp.") {
        computerScore = ++computerScore;
    }

    // Display who won, what the current score is, and prompt to play again
    userChoice = prompt(`
        You chose: ${userChoice}
        Computer chose: ${computerChoice}
        The winner is... ${roundWinner}
        Your score: ${userScore}
        Computer's score: ${computerScore}
        To play again, type \"rock\", \"paper\", or 
        \"scissors\" below :`
    );

    // If the user gives an answer, confirm it and let the loop run again
    // If the user clicks okay without answering, prompt() returns "" empty string - consider same as cancel
    // If the user clicks cancel, prompt() returns null, which breaks the loop and ends the game
    if (userChoice === "") {
        userChoice = null;
    } else {
        userChoice = confirmUserChoice(userChoice);
    }
}