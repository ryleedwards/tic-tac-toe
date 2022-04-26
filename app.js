// gameBoard Module
const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return _board;
  };

  const getSquare = (position) => {
    return _board[position];
  };

  const updateSquare = (position, entry) => {
    _board.splice(position, 1, entry);
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
  const getTurn = () => {
    return turn;
  };
  const incrementTurn = () => {
    turn++;
  };
  const resetTurns = () => {
    turn = 0;
  };
  return {
    getTurn,
    incrementTurn,
    resetTurns,
  };
})();

// player Factory

const player = (name, number) => {
  if (number == 1) icon = "X";
  else icon = "O";
  let state = {
    name,
    number,
    icon,
  };

  return {
    greet: () => console.log(`hello my name is ${name}`),
    getIcon: () => state.icon,
  };
};

const player1 = player("player1", 1);
const player2 = player("player2", 2);

gameBoard.updateSquare(0, player1.getIcon());
