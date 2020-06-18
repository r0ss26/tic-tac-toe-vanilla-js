class Square {
  constructor() {
    this.status = null;
  }
}

class Game {
  constructor() {
    this.board = [ 
      [new Square, new Square, new Square],
      [new Square, new Square, new Square],
      [new Square, new Square, new Square]
    ];
    this.nextMove = 'X';
    this.winner = null;
    this.won = false;
  }

  checkGameWon() {
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
  
    winningLines.forEach(line => {
      let board = this.board.flat();
      if (board[line[0]].status !== null && board[line[0]].status === board[line[1]].status && board[line[1]].status === board[line[2]].status) {
        this.won = true;
      }
    })
    return this.won
  }

  displayWinner(DOMNode) {
    DOMNode.innerText = `${this.winner} Wins!`
  }

  displayCurrentPlayer(DOMNode) {
    DOMNode.innerText = `${this.nextMove}'s turn.`;
  }

  togglePlayer() {
    this.nextMove = this.nextMove === 'X' ? 'O' : 'X';
  }

  restart() {
    this.board = [ 
      [new Square, new Square, new Square],
      [new Square, new Square, new Square],
      [new Square, new Square, new Square]
    ];
    this.nextMove = 'X';
    this.winner = null;
    this.won = false;
  }
}

// Set up event listeners
let squares, winner, turn, restartButton;
squares = document.querySelectorAll('.square');
winner = document.querySelector('.winner');
turn = document.querySelector('.turn');
restartButton = document.querySelector('#restart');


squares.forEach(square => {
  square.addEventListener('click', () => {
    if (square.innerText == "" && !game.won) {
      game.board[Math.floor((square.id - 1) / 3)][(square.id -1) % 3].status = game.nextMove;
      square.innerText = game.nextMove;
      if (game.checkGameWon()) {
        game.winner = game.nextMove;
        game.displayWinner(winner);
        turn.innerText = "";
      } else {
        game.togglePlayer();
        game.displayCurrentPlayer(turn);
      }
    }
  })
})

restartButton.addEventListener('click', () => {
  squares.forEach(square => {
    square.innerHTML = "";
  })
  game.restart();
  turn.innerText = `${game.nextMove}'s turn.`
  document.querySelector('.winner').innerText = "";
})

let game = new Game;
game.displayCurrentPlayer(turn);
