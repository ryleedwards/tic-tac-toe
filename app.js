// session Module
const session = (() => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList[1] == "replay") {
        gameBoard.clearBoard();
        gameState.resetTurns();
        session.resultScreen.classList.toggle("hidden");
      }
    });
  });
  const boardDisplay = document.querySelectorAll(".square");
  boardDisplay.forEach((square) => {
    square.addEventListener("click", (e) => {
      const squareIndex = e.target.dataset.index;
      gameBoard.updateSquare(
        squareIndex,
        gameState.getCurrentPlayer().getIcon()
      );
    });
  });
  const declaredOutcome = document.getElementById("declared-outcome");
  const resultScreen = document.querySelector(".result-screen");

  const aiPlaying = true;
  const DELAY = 250;

  return {
    boardDisplay: boardDisplay,
    declaredOutcome: declaredOutcome,
    resultScreen: resultScreen,
    aiPlaying: aiPlaying,
    DELAY: DELAY,
  };
})();

// gameBoard Module
const gameBoard = (() => {
  // board array
  let board = ["", "", "", "", "", "", "", "", ""];

  const updateSquare = (position, entry) => {
    if (board[position] == "") {
      board.splice(position, 1, entry);
      session.boardDisplay[position].innerText = entry;
      gameState.incrementTurn();
      return;
    }
    if (board[position] != "") {
      return;
    }
  };

  const getBoard = () => {
    return board;
  };

  const checkForWin = () => {
    let winner = { declared: false, winnerName: "" };
    // Tie
    if (!board.includes("")) {
      winner.declared = true;
      winner.winnerName = "tie";
    }
    // Horizontal
    for (i = 0; i < 3; i++) {
      let j = i * 3;
      let joined = board.slice(j, j + 3).join("");
      if (joined == "XXX" || joined == "OOO") {
        if (joined == "XXX") {
          winner.winnerName = "X";
        } else if (joined == "OOO") {
          winner.winnerName = "O";
        }
        winner.declared = true;
      }
    }
    // Vertical
    for (i = 0; i < 3; i++) {
      let toJoin = [];
      toJoin.push(board[i]);
      toJoin.push(board[i + 3]);
      toJoin.push(board[i + 6]);
      let joined = toJoin.join("");
      if (joined == "XXX" || joined == "OOO") {
        if (joined == "XXX") {
          winner.winnerName = "X";
        } else if (joined == "OOO") {
          winner.winnerName = "O";
        }
        winner.declared = true;
      }
    }
    // Diagonal
    let diag1 = [board[0], board[4], board[8]].join("");
    let diag2 = [board[2], board[4], board[6]].join("");
    if (diag1 == "XXX" || diag1 == "OOO" || diag2 == "XXX" || diag2 == "OOO") {
      if (diag1 == "XXX") {
        winner.winnerName = "X";
      } else if (diag1 == "OOO") {
        winner.winnerName = "O";
      } else if (diag2 == "XXX") {
        winner.winnerName = "X";
      } else if (diag2 == "OOO") {
        winner.winnerName = "O";
      }
      winner.declared = true;
    }

    return winner;
  };

  const clearBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    session.boardDisplay.forEach((square) => {
      square.innerText = "";
    });
  };

  return {
    updateSquare,
    getBoard,
    checkForWin,
    clearBoard,
  };
})();

// gameState Module
const gameState = (() => {
  let turn = 0;
  const players = [];
  let currentPlayer = "";

  const initializeGame = () => {
    players.push(player("player1", true));
    players.push(aiBot("Computer", false, "easy"));
    currentPlayer = players[0];
  };

  const getTurn = () => {
    return turn;
  };

  const incrementTurn = () => {
    // if status returns win, don't execute
    if (!checkStatus()) {
      turn++;
      if (turn % 2) {
        currentPlayer = players[1];
        if (session.aiPlaying) {
          setTimeout(() => {
            players[1].aiPlay();
          }, session.DELAY);
        }
      } else {
        currentPlayer = players[0];
      }
    }
  };
  const resetTurns = () => {
    turn = 0;
    currentPlayer = players[0];
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const checkStatus = () => {
    const win = gameBoard.checkForWin();
    if (win.declared) {
      if (win.winnerName == "tie") {
        session.declaredOutcome.innerText = `Tie Game!`;
      } else {
        session.declaredOutcome.innerText = `${win.winnerName} wins!`;
      }
      session.resultScreen.classList.toggle("hidden");
      return true;
    }
    return false;
  };

  return {
    getTurn,
    incrementTurn,
    resetTurns,
    initializeGame,
    getCurrentPlayer,
  };
})();

// player Factory

const player = (name, first) => {
  if (first) icon = "X";
  else icon = "O";
  let state = {
    name,
    first,
    icon,
  };

  return {
    getIcon: () => state.icon,
  };
};

const aiBot = (name, first, difficulty) => {
  let state = {
    difficulty,
  };
  const prototype = player(name, first);

  const getDifficulty = () => {
    console.log(difficulty);
  };

  const _firstMove = (availableMoves) => {
    randomSelect =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard.updateSquare(randomSelect, icon);
  };

  const _middleCornerMove = (availableMoves) => {
    let priotizedSelect = "";
    let prioritizedMoves = [];
    let bool = availableMoves.includes(4) == false;
    // middle
    if (availableMoves.includes(4)) {
      priotizedSelect = 4;
    }
    // corners
    else {
      if (availableMoves.includes(0)) prioritizedMoves.push(0); //top left
      if (availableMoves.includes(2)) prioritizedMoves.push(2); //top right
      if (availableMoves.includes(6)) prioritizedMoves.push(6); //bottom left
      if (availableMoves.includes(8)) prioritizedMoves.push(8); //bottom right

      priotizedSelect =
        prioritizedMoves[Math.floor(Math.random(availableMoves.length))];
    }
    gameBoard.updateSquare(priotizedSelect, icon);
  };

  const _blockingMove = (availableMoves) => {
    let board = gameBoard.getBoard();
  };

  const aiPlay = () => {
    currentBoard = gameBoard.getBoard();
    // determine available plays on board
    let availablePlays = [];
    for (i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] == "") {
        availablePlays.push(i);
      }
    }
    switch (difficulty) {
      case "easy":
        // randomly play among available options (EASY)
        _firstMove(availablePlays);
        break;

      // prioritize next-best spot (MEDIUM)
      case "medium":
        _middleCornerMove(availablePlays);
        break;
    }
  };

  return Object.assign({ aiPlay, getDifficulty }, prototype);
};

gameState.initializeGame();
