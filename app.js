// gameBoard Module
const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return _board;
  };

  return {
    getBoard,
  };
})();

console.log(gameBoard.getBoard());

// gameState Module
const gameState = (() => {
  let turn = 0;
  const getTurn = () => {
    return turn;
  };
  const incrementTurn = () => {
    turn++;
  };
  return {
    getTurn,
    incrementTurn,
  };
})();

const player = (name) => {
  let state = {
    name,
  };
};
