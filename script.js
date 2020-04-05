
/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

var board;
var turn = 'X';
var win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('replay_button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        if (winner) {
            return winner 
          } else if (board.includes('')) {
            return null // if there's an empty space, return null (no winner yet)
          } else {
            return 'T' // no winner and no empty spaces? That's a tie!
          }
};


function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    // le joueur ne peux pas placer une mark sur une case non vide
    if (board[idx] === '' && win!= 'T' && !(win)){
    board[idx] = turn;
    if (turn === 'X') {
        turn = 'O';
        } else {
        turn = 'X' 
        };
      }
    win = getWinner();
    render();
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
      squares[index].textContent = mark;
    });
    if ( win === 'T' ) {
        messages.textContent = `The game ended in a draw !`
      } else if (win) { 
        messages.textContent = `${win} wins the game!`
        $('#ex2').modal();
      } else {
        messages.textContent = `It's ${turn}'s turn!`
      }
    };

init();


