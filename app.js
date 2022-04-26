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
    let winner = { declared: false, winnerName: "" };
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
    console.log(win);
    if (win.declared) {
      console.log(`${win.winnerName} wins!`);
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
