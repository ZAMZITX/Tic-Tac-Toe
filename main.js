const cells = document.querySelectorAll('.cell');
let currentPlayer = "X";
let gameOver = false;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

function cellClicked(e) {
    if (!gameOver) {
        if (e.target.textContent === '') {
            e.target.textContent = currentPlayer;
            checkForWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("current-player").textContent = "Current player: " + currentPlayer;
        }
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent === currentPlayer && 
            cells[b].textContent === currentPlayer && 
            cells[c].textContent === currentPlayer) {
            gameOver = true;
            document.getElementById("winner").textContent = currentPlayer + " wins!";
            return;
        }
    }

    let tie = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            tie = false;
            break;
        }
    }

    if (tie) {
        gameOver = true;
        document.getElementById("winner").textContent = "It's a Tie!";
    }
}

document.getElementById("reset-button").addEventListener("click", function(){
    gameOver = false;
    currentPlayer = "X";
    document.getElementById("current-player").textContent = "Current player: " + currentPlayer;
    document.getElementById("winner").textContent = "";
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
});