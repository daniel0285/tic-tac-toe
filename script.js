const gameBoard = (function () {
  const board = Array(9).fill("empty");

  const isGameOver = () => board.every((el) => el !== "empty");

  const fill = (index, symbol) => {
    if (board[index] === "empty") {
      board[index] = symbol;
    }
  };

  const getBoard = () => board;

  const resetBoard = () => board.fill("empty");

  return { isGameOver, fill, getBoard, resetBoard };
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
  const players = [
    { name: "Player 1", symbol: "X", score: 0 },
    { name: "Player 2", symbol: "O", score: 0 },
  ];
  let currentPlayer;
  currentPlayer = players[0];
  let isFinished = false;

  // const addPlayer = (name, symbol) => {
  //   const newPlayer = player.makePlayer(name, symbol);
  //   if (players.length < 2) {
  //     players.push(newPlayer);
  //   }

  //   if (players.length === 1) {
  //     currentPlayer = players[0];
  //   }
  // };

  const board = gameBoard.getBoard();

  const resetGame = () => {
    gameBoard.resetBoard();
    isFinished = false;
  };

  const checkWinner = () => {
    return winningCombination.some((combination) =>
      combination.every((index) => board[index] === currentPlayer.symbol)
    );
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const addSymbols = (event) => {
    event.target.textContent = currentPlayer.symbol;
  };

  const controller = (index, event) => {
    if (board[index] !== "empty" || index > board.length || index < 0) {
      console.log("invalid input");
      return;
    }

    if (!isFinished) {
      gameBoard.fill(index, currentPlayer.symbol);
      addSymbols(event);
    }

    if (checkWinner()) {
      console.log(`The winner is ${currentPlayer.name}`);
      isFinished = true;
    } else if (gameBoard.isGameOver()) {
      console.log(`It's a draw!`);
      isFinished = true;
    } else {
      console.log(`Not Finished`);
      switchPlayer();
    }
  };

  return { controller, resetGame };
})();

const displayGameBoard = () => {
  const ticTacToeBoard = document.getElementById("tic-tac-toe-board");
  ticTacToeBoard.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const board = gameBoard.getBoard();

  for (let i = 0; i < board.length; i++) {
    const box = document.createElement("button");
    box.classList.add("spots");
    box.dataset.index = i;
    fragment.append(box);
  }

  ticTacToeBoard.appendChild(fragment);
};

const eventHandler = (event) => {
  if (event.target.classList.contains("spots")) {
    const indexTarget = event.target.dataset.index;

    const indexText = document.querySelector(".index-number");
    indexText.textContent = event.target.dataset.index;

    gameController.controller(indexTarget, event);
  }

  if (event.target.id === "reset") {
    displayGameBoard();
    gameController.resetGame();
  }
};

document.addEventListener("click", (event) => eventHandler(event));

displayGameBoard();
