let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const statusDisplay = document.getElementById('status');
const cells = Array.from(document.getElementsByClassName('cell'));
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
  const index = event.target.getAttribute('data-index');

  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.classList.add(currentPlayer);

  checkResult();
  if (isGameActive) switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}


function checkResult() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      displayWinMessage();
      isGameActive = false;
      highlightWinningCells(condition);
      return;
    }
  }

  if (!board.includes('')) {
    statusDisplay.innerText = "It's a draw!";
    isGameActive = false;
  }
}

function displayWinMessage() {
  if (currentPlayer === 'X') {
    statusDisplay.innerText = "Player X won!";
  } else {
    statusDisplay.innerText = "Player O won!";
  }
}


function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add('win');
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  statusDisplay.innerText = `Player X's turn`;

  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O', 'win');
  });
}


cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('restart').addEventListener('click', restartGame);
