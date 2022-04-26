// gameBoard Module
const gameBoard = (() => {
  // array of squares on display and assignment of click listeners
  const boardDisplay = document.querySelectorAll(".square");
  boardDisplay.forEach((square) => {
    square.addEventListener("click", (e) => {
      const squareIndex = e.target.dataset.index;
      updateSquare(squareIndex, gameState.getCurrentPlayer().getIcon());
    });
  });

  // board array
  let board = ["", "", "", "", "", "", "", "", ""];

  const updateSquare = (position, entry) => {
    if (board[position] == "") {
      board.splice(position, 1, entry);
      boardDisplay[position].innerText = entry;
      gameState.incrementTurn();
      return;
    }
    if (board[position] != "") {
      console.log("That position is already taken");
      return;
    }
  };

  const getBoard = () => {
    return board;
  };

  const checkForWin = () => {
    // Horizontal
    let winner = false;
    for (i = 0; i < 3; i++) {
      let j = i * 3;
      let joined = board.slice(j, j + 3).join("");
      if (joined == "XXX" || joined == "OOO") {
        winner = true;
      }
    }

    return winner;
  };

  return {
    updateSquare,
    getBoard,
    checkForWin,
  };
})();

// gameState Module
const gameState = (() => {
  let turn = 0;
  const players = [];
  let currentPlayer = "";

  const initializeGame = () => {
    players.push(player("player1", true));
    players.push(player("player2", false));
    currentPlayer = players[0];
  };

  const getTurn = () => {
    return turn;
  };
  const incrementTurn = () => {
    checkStatus();
    turn++;
    if (turn % 2) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
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
    if (win) {
      console.log("winner declared");
    }
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

gameState.initializeGame();
