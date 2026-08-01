let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    document.getElementById("result").textContent = "Choose your move!";
    document.getElementById("score").textContent = "You: 0 | Computer: 0";
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false; 
    });
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();

    let result = "";

    if (humanChoice === computerChoice) {
        result = `Tie! Both chose ${humanChoice}`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        result = `You win! ${humanChoice} beats ${computerChoice}`;
        
    } else {
        computerScore++;
        result = `You lose! ${computerChoice} beats ${humanChoice}`;
    }

    document.getElementById("result").textContent = result;
    document.getElementById("score").textContent =
        `You: ${humanScore} | Computer: ${computerScore}`;

    if (humanScore === 5 || computerScore === 5) {
        const winner = humanScore === 5 ? "🎉 You won the game! 🎉" : "😢 Computer won the game!";
        
        document.getElementById("result").textContent = winner;
        
        document.querySelectorAll("button").forEach(btn => {
            btn.disabled = true;
        });
        
        setTimeout(() => {
            if (confirm(winner + "\n\nDo you want to play again?")) {
                resetGame();
            }
        }, 100);
    }
}

document.getElementById("rock").addEventListener("click", () => {
    playRound("rock");
});

document.getElementById("paper").addEventListener("click", () => {
    playRound("paper");
});

document.getElementById("scissors").addEventListener("click", () => {
    playRound("scissors");
});