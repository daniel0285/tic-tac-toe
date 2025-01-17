const ticTacToe = (function () {
  const gameBoard = Array(9).fill("empty");
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

  const makePlayer = (name, symbol) => ({ name, symbol });

  const addPlayer = (name, symbol) => {
    const newPlayer = makePlayer(name, symbol);
    if (players.length <= 1) {
      players.push(newPlayer);
    }

    if (players.length === 1) {
      currentPlayer = players[0];
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const gameController = (index) => {
    if (gameBoard[index] !== "empty" || index > gameBoard.length || index < 0) {
      console.log("invalid input");
      return;
    }

    fillGameBoard(index, currentPlayer.symbol);

    if (checkWinner()) {
      console.log(`The winner is ${currentPlayer.name}`);
      console.log(gameBoard);
    } else if (isGameOver()) {
      console.log(`It's a draw!`);
      console.log(gameBoard);
    } else {
      console.log(`Not Finished`);
      console.log(gameBoard);
      switchPlayer();
    }
  };
  const fillGameBoard = (index, symbol) => {
    gameBoard[index] = symbol;
  };

  const checkWinner = () => {
    return winningCombination.some((combination) =>
      combination.every((index) => gameBoard[index] === currentPlayer.symbol)
    );
  };
  const isGameOver = () => gameBoard.every((el) => el !== "empty");

  return { addPlayer, gameController, players, gameBoard, currentPlayer };
})();
