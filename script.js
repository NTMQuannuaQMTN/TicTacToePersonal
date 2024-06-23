// Connect 4 game logic

const ROWS = 3;
const COLS = 3;
let currentPlayer = 'red';
let gameBoard = [];
let gameRunning = true;
document.body.style.backgroundColor = 'Red';

// Initialize game board
function initializeBoard() {
    gameBoard = [];
    for (let row = 0; row < ROWS; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < COLS; col++) {
            gameBoard[row][col] = null; // Represents an empty cell
        }
    }
}

// Function to create the game board in HTML
function renderBoard() {
    const boardElement = document.querySelector('.game-board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            boardElement.appendChild(cell);
        }
    }
}

// Function to handle player turn
function handlePlayerTurn(row, column) {
    if (!gameRunning) return;

    if (gameBoard[row][column] === null) {
        gameBoard[row][column] = currentPlayer;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${column}"]`);
        cell.style.backgroundColor = currentPlayer;
        
        // Check for win
        if (checkForWin(row, column)) {
            gameRunning = false;
            alert(`${currentPlayer.toUpperCase()} wins!`);
        } else {
            // Switch player
            currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
            document.body.style.backgroundColor = currentPlayer;
            document.getElementById('current-player').textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
            if (currentPlayer === 'red') {
                document.getElementById('turn').style.color = "White";
            } else {
                document.getElementById('turn').style.color = "Black";
            }
        }
    }

    // Check for draw
    if (checkForDraw() && gameRunning) {
        gameRunning = false;
        alert("It's a draw!");
    }
}

// Function to check for a win condition
function checkForWin(row, col) {
    if ((gameBoard[0][0] === currentPlayer && gameBoard[0][1] === currentPlayer && gameBoard[0][2] === currentPlayer) || (gameBoard[1][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[1][2] === currentPlayer) || (gameBoard[2][0] === currentPlayer && gameBoard[2][1] === currentPlayer && gameBoard[2][2] === currentPlayer) || (gameBoard[0][0] === currentPlayer && gameBoard[1][0] === currentPlayer && gameBoard[2][0] === currentPlayer) || (gameBoard[0][1] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][1] === currentPlayer) || (gameBoard[0][2] === currentPlayer && gameBoard[1][2] === currentPlayer && gameBoard[2][2] === currentPlayer) || (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) || (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer)) {return true;}

    return false;
}

// Function to check for a draw condition
function checkForDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (gameBoard[row][col] === null) {
                return false; // If any cell is empty, game is not a draw
            }
        }
    }
    return true; // All cells are filled, it's a draw
}

// Event listener for clicking on the game board
document.querySelector('.game-board').addEventListener('click', function(event) {
    if (!gameRunning) return;

    const column = parseInt(event.target.dataset.col);
    const row = parseInt(event.target.dataset.row);
    if (!isNaN(column) && !isNaN(row)) {
        handlePlayerTurn(row, column);
    }
});

// Event listener for reset button
document.getElementById('reset-button').addEventListener('click', function() {
    gameRunning = true;
    currentPlayer = 'red';
    initializeBoard();
    renderBoard();
    document.getElementById('current-player').textContent = 'Red';
    document.body.style.backgroundColor = 'Red';
    document.getElementById('turn').style.color = "White";
});

// Initialize the game on page load
initializeBoard();
renderBoard();
