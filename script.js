const ticTactToe = (function () {
  const gameBoard = [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ];
  const players = [];
  const symbols = ["X", "O"];
  let currentPlayer;

  const makePlayer = (name, symbol) => {
    return { name, symbol };
  };

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
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else if (currentPlayer === players[1]) {
      currentPlayer = players[0];
    }
  };

  const gameController = (index) => {
    fillGameBoard(index, currentPlayer.symbol);
    gameLogic();
  };
  const fillGameBoard = (index, symbol) => {
    if (gameBoard[index] === "empty") {
      gameBoard[index] = symbol;
    }
  };
  const gameLogic = () => {
    if (combination(0, 1, 2)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(3, 4, 5)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(6, 7, 8)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(0, 3, 6)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(1, 4, 7)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(2, 5, 8)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(0, 4, 8)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (combination(2, 4, 6)) {
      console.log(`The Winner is ${currentPlayer.name}`);
    } else if (isGameOver()) {
      console.log("Draw");
    } else {
      console.log("Not Finished");
      console.log(gameBoard);
      console.log(currentPlayer.name);
      switchPlayer();
    }
  };

  const combination = (num1, num2, num3) => {
    if (
      (gameBoard[num1] === symbols[0] &&
        gameBoard[num2] === symbols[0] &&
        gameBoard[num3] === symbols[0]) ||
      (gameBoard[num1] === symbols[1] &&
        gameBoard[num2] === symbols[1] &&
        gameBoard[num3] === symbols[1])
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isGameOver = () => gameBoard.every((el) => el !== "empty");

  return { addPlayer, gameController, players, gameBoard, currentPlayer };
})();
