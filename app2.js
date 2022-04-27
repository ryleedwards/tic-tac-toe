let board = ["X", "", "", "", "O", "", "", "X", ""];

let indices = [];

for (i = 0; i < board.length; i++) {
  if (board[i] == "") {
    indices.push(i);
  }
}

console.log(indices);
