const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 1;
let gameOver = false;

const boardDiv = document.getElementById('board');
const messageDiv = document.getElementById('message');

function createBoard() {
  boardDiv.innerHTML = '';
  board = [];

  for (let row = 0; row < ROWS; row++) {
    let rowArr = [];
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      boardDiv.appendChild(cell);
      rowArr.push(0);
    }
    board.push(rowArr);
  }

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
}

function handleClick(e) {
  if (gameOver) return;

  const col = parseInt(e.target.dataset.col);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = currentPlayer;
      const cell = getCellElement(row, col);
      cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');

      if (checkWinner(row, col)) {
        messageDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameOver = true;
      } else if (isBoardFull()) {
        messageDiv.textContent = "It's a draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        messageDiv.textContent = `Player ${currentPlayer}'s turn (${currentPlayer === 1 ? 'Red' : 'Yellow'})`;
      }
      break;
    }
  }
}

function getCellElement(row, col) {
  return boardDiv.children[row * COLS + col];
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== 0));
}

function checkWinner(row, col) {
  const directions = [
    [[0, 1], [0, -1]],     // Horizontal
    [[1, 0], [-1, 0]],     // Vertical
    [[1, 1], [-1, -1]],    // Diagonal /
    [[1, -1], [-1, 1]]     // Diagonal \
  ];

  for (let dir of directions) {
    let count = 1;
    for (let [dr, dc] of dir) {
      let r = row + dr;
      let c = col + dc;
      while (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === currentPlayer
      ) {
        count++;
        r += dr;
        c += dc;
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

function resetGame() {
  currentPlayer = 1;
  gameOver = false;
  messageDiv.textContent = "Player 1's turn (Red)";
  createBoard();
}

createBoard();
