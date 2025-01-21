const gameBoard = (function () {
  const board = Array(9).fill("empty");
  const isBoardFull = () => board.every((el) => el !== "empty");

  const fill = (index, symbol) => {
    if (board[index] === "empty") {
      board[index] = symbol;
    }
  };

  const getBoard = () => board;
  const resetBoard = () => board.fill("empty");

  return { isBoardFull, fill, getBoard, resetBoard };
})();

const player = (function () {
  const makePlayer = (name, symbol) => ({ name, symbol });
  return { makePlayer };
})();

const game = (function () {
  const playerOneScore = document.getElementById("player-one-score");
  const playerTwoScore = document.getElementById("player-two-score");
  const resultText = document.querySelector(".game-result");

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
    { name: " ", symbol: "X", score: 0 },
    { name: " ", symbol: "O", score: 0 },
  ];
  const board = gameBoard.getBoard();

  let isRoundFinished = false;
  let currentPlayer;
  currentPlayer = players[0];

  const assignPlayerNames = (object) => {
    players[0].name = object.playerX;
    players[1].name = object.playerO;
  };

  const restartGame = () => {
    isRoundFinished = false;
    resetPlayersScore();
    currentPlayer = players[0];
    gameBoard.resetBoard();
    updatePlayerScore();
    resetText();
  };

  const nextRound = () => {
    isRoundFinished = false;
    currentPlayer = players[0];
    gameBoard.resetBoard();
    resetText();
  };

  const isGameOver = () => {
    if (players[0].score === 2 || players[1].score === 2) {
      resultText.textContent = `${currentPlayer.name} won the game`;
      return true;
    }
  };

  const resetText = () => (resultText.innerText = "");
  const resetPlayersScore = () => {
    players[0].score = 0;
    players[1].score = 0;
  };

  const checkWinner = () => {
    return winningCombination.some((combination) =>
      combination.every((index) => board[index] === currentPlayer.symbol)
    );
  };

  const updatePlayerScore = () => {
    playerOneScore.innerText = players[0].score;
    playerTwoScore.innerText = players[1].score;
  };

  const increaseScore = (player) => player.score++;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const addSymbols = (event) => {
    event.target.textContent = currentPlayer.symbol;
  };

  const controller = (index, event) => {
    if (isGameOver()) return;

    if (board[index] !== "empty" || index > board.length || index < 0) {
      resultText.textContent = "invalid input";
      return;
    }

    if (!(isRoundFinished || isGameOver())) {
      gameBoard.fill(index, currentPlayer.symbol);
      addSymbols(event);
    } else {
      return;
    }

    if (checkWinner()) {
      resultText.textContent = `The winner is ${currentPlayer.name}`;
      isRoundFinished = true;
      increaseScore(currentPlayer);
      updatePlayerScore();
      isGameOver();
    } else if (gameBoard.isBoardFull()) {
      resultText.textContent = `It's a draw!`;
      isRoundFinished = true;
    } else if (isGameOver()) {
    } else {
      switchPlayer();
    }
  };

  return {
    controller,
    restartGame,
    nextRound,
    assignPlayerNames,
  };
})();

const DOM = (function () {
  const ticTacToeBoard = document.getElementById("tic-tac-toe-board");
  const ticTacToeWrapper = document.getElementById("tic-tac-toe-wrapper");
  const modal = document.getElementById("modal");
  const gameForm = document.getElementById("game-form");

  const renderGameBoard = () => {
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

  const clearGameBoard = () => {
    const spots = document.querySelectorAll(".spots");
    spots.forEach((item) => (item.innerText = ""));
  };

  const displayGame = () => {
    renderGameBoard();
    ticTacToeWrapper.classList.remove("hidden");
  };

  const insertPlayerData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const playerNames = Object.fromEntries(formData);
    game.assignPlayerNames(playerNames);
  };

  const displayForm = () => {
    modal.showModal();
  };

  const clickHandler = (event) => {
    if (event.target.classList.contains("spots")) {
      const indexTarget = event.target.dataset.index;
      game.controller(indexTarget, event);
    }

    if (event.target.id === "restart") {
      clearGameBoard();
      game.restartGame();
    }

    if (event.target.id === "next-round") {
      clearGameBoard();
      game.nextRound();
    }
  };

  document.addEventListener("click", (event) => clickHandler(event));
  gameForm.addEventListener("submit", (event) => {
    insertPlayerData(event);
    modal.close();
    displayGame();
  });

  return { displayForm };
})();

DOM.displayForm();
