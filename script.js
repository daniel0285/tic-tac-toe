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
    DOM.changeInfoText(players[0], players[1]);
  };

  const restartGame = () => {
    isRoundFinished = false;
    resetPlayersScore();
    currentPlayer = players[0];
    gameBoard.resetBoard();
    updatePlayerScore();
  };

  const nextRound = () => {
    isRoundFinished = false;
    currentPlayer = players[0];
    gameBoard.resetBoard();
  };

  const isGameOver = () => {
    if (players[0].score === 5 || players[1].score === 5) {
      DOM.displayResult(`${currentPlayer.name} won the game!`);
      DOM.editBtn("restart", "Restart");
      return true;
    }
  };

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
    event.target.classList.add(currentPlayer.symbol);
  };

  const controller = (index, event) => {
    if (isGameOver()) return;

    if (board[index] !== "empty" || index > board.length || index < 0) {
      return;
    }

    if (!isRoundFinished) {
      gameBoard.fill(index, currentPlayer.symbol);
      addSymbols(event);

      if (checkWinner()) {
        handleWin();
      } else if (gameBoard.isBoardFull()) {
        handleDraw();
      } else {
        switchPlayer();
      }
    }
  };

  const handleWin = () => {
    DOM.displayResult(`The winner is ${currentPlayer.name}`);
    isRoundFinished = true;
    increaseScore(currentPlayer);
    updatePlayerScore();
    isGameOver();
  };

  const handleDraw = () => {
    DOM.displayResult(`It's a draw!`);
    isRoundFinished = true;
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
  const playerOne = document.getElementById("player-one-name-symbol");
  const playerTwo = document.getElementById("player-two-name-symbol");
  const formModal = document.getElementById("form-modal");
  const resultModal = document.getElementById("result-modal");
  const resultText = document.getElementById("result-text");
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
    spots.forEach((item) => {
      item.innerText = "";
      item.classList.remove("X", "O");
    });
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

  const changeInfoText = (p1, p2) => {
    playerOne.innerText = `${p1.name} ( ${p1.symbol} )`;
    playerTwo.innerText = `${p2.name} ( ${p2.symbol} )`;
  };

  const displayResult = (text) => {
    resultText.innerText = text;
    resultModal.show();
  };

  const closeResult = () => {
    resultModal.close();
  };

  const editBtn = (elemID, elemText) => {
    const targetBtn = document.querySelector(
      "#result-modal > .modal-content > button"
    );
    targetBtn.setAttribute("id", elemID);
    targetBtn.innerText = elemText;
  };

  const clickHandler = (event) => {
    if (event.target.classList.contains("spots")) {
      const indexTarget = event.target.dataset.index;
      game.controller(indexTarget, event);
    }

    if (event.target.id === "restart") {
      clearGameBoard();
      closeResult();
      editBtn("next-round", "Next Round");
      game.restartGame();
    }

    if (event.target.id === "next-round") {
      clearGameBoard();
      closeResult();
      game.nextRound();
    }
  };

  document.addEventListener("click", (event) => clickHandler(event));
  gameForm.addEventListener("submit", (event) => {
    insertPlayerData(event);
    formModal.close();
    displayGame();
  });

  return { displayResult, closeResult, changeInfoText, editBtn };
})();
