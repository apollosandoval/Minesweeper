const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (numCols=0; numCols<numberOfColumns; numCols++) {
    let row = [];
    for (numRows=0; numRows<numberOfRows; numRows++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (numCols=0; numCols<numberOfColumns; numCols++) {
    let row = [];
    for (numRows=0; numRows<numberOfRows; numRows++) {
      row.push(null);
    }
    board.push(row);
  }
  // insert random bomb generation code below
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
}
const printBoard = (board) => {
  console.log('Current Board:');
  board.map(row => row.join(' | ')).join('\n');
}

//console.log(generatePlayerBoard(3,4));
console.log(generateBombBoard(3,4,5));
