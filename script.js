let squares = document.querySelectorAll('.square');

let game = {
  board: [ new Array(3).fill(null), new Array(3).fill(null), new Array(3).fill(null) ],
  nextMove: 'X',
  won: false
}

const checkGameWon = () => {
  const winningLines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ]

  let won = false;
  winningLines.forEach(line => {
    let board = game.board.flat();
    if (board[line[0]] !== null && board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]]) {
      won = true;
    }
  })
  game.won = won;
  return won;
}

squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.innerText == "" && !game.won) {
      square.innerText = game.nextMove;
    }
    game.board[Math.floor((square.id - 1) / 3)][(square.id -1) % 3] = game.nextMove;
    if (checkGameWon()) {
      document.querySelector('.winner').innerText = `${game.nextMove} wins!`
    } else {
      game.nextMove = game.nextMove == 'X' ? 'O' : 'X';
    }
  })
})

document.querySelector('#restart').addEventListener('click', () => {
  squares.forEach(square => {
    square.innerHTML = "";
  })

  document.querySelector('.winner').innerText = "";

  game = {
    board: [ new Array(3).fill(null), new Array(3).fill(null), new Array(3).fill(null) ],
    nextMove: 'X',
    won: false
  }
})