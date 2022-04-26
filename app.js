// gameBoard Module
const gameBoard = (() => {
  // array of squares on display and assignment of click listeners
  const _boardDisplay = document.querySelectorAll(".square");
  _boardDisplay.forEach((square) => {
    square.addEventListener("click", (e) => {
      const squareIndex = e.target.dataset.index;
      updateSquare(squareIndex, gameState.getCurrentPlayer().getIcon());
    });
  });

  // board array
  let _board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return _board;
  };

  const getSquare = (position) => {
    return _board[position];
  };

  const updateSquare = (position, entry) => {
    if (_board[position] == "") {
      _board.splice(position, 1, entry);
      _boardDisplay[position].innerText = entry;
      gameState.incrementTurn();
      return;
    }
    if (_board[position] != "") {
      console.log("That position is already taken");
      return;
    }
  };

  return {
    getBoard,
    getSquare,
    updateSquare,
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

  //const selectSquare = () => {};

  return {
    getIcon: () => state.icon,
    //selectSquare,
  };
};

gameState.initializeGame();
