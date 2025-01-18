const gameBoard = (function () {
  const board = Array(9).fill("empty");

  const isGameOver = () => board.every((el) => el !== "empty");

  const fill = (index, symbol) => {
    if (board[index] === "empty") {
      board[index] = symbol;
    }
  };

  const getBoard = () => board;

  return { isGameOver, fill, getBoard };
})();

const player = (function () {
  const makePlayer = (name, symbol) => ({ name, symbol });

  return { makePlayer };
})();

const gameController = (function () {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const players = [];
  let currentPlayer;

  const addPlayer = (name, symbol) => {
    const newPlayer = player.makePlayer(name, symbol);
    if (players.length < 2) {
      players.push(newPlayer);
    }

    if (players.length === 1) {
      currentPlayer = players[0];
    }
  };

  const board = gameBoard.getBoard();

  const checkWinner = () => {
    return winningCombination.some((combination) =>
      combination.every((index) => board[index] === currentPlayer.symbol)
    );
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const controller = (index) => {
    if (board[index] !== "empty" || index > board.length || index < 0) {
      console.log("invalid input");
      return;
    }

    gameBoard.fill(index, currentPlayer.symbol);

    if (checkWinner()) {
      console.log(`The winner is ${currentPlayer.name}`);
      console.log(board);
    } else if (gameBoard.isGameOver()) {
      console.log(`It's a draw!`);
      console.log(board);
    } else {
      console.log(`Not Finished`);
      console.log(board);
      switchPlayer();
    }
  };

  return { controller, addPlayer };
})();
