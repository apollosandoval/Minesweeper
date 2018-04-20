const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (numRows=0; numRows<numberOfRows; numRows++) { //for{will create one empty row array for specified number of rows}
    let row = [];
    for (numCols=0; numCols<numberOfColumns; numCols++) { //length of row is determined by # of columns
      row.push(' '); //adds 'emptyspace' to 'row' array
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (numRows=0; numRows<numberOfRows; numRows++) { //for{will create one empty row array for specified number of rows}
    let row = [];
    for (numCols=0; numCols<numberOfColumns; numCols++) { //length of row is determined by # of columns
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random()*numberOfRows); //Do I need to subtract 1?
    let randomColumnIndex = Math.floor(Math.random()*numberOfColumns); //Do I need to subtract 1?
    board[randomRowIndex][randomColumnIndex] = 'B'; //array indexing: array[row][column]
    numberOfBombsPlaced++;
  }
  return board;
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n')); //joins elements of 'board' array rows with ' | ' then joins array rows with 'newline' character
}

playerBoard = generatePlayerBoard(3,4);
bombBoard = generateBombBoard(3,4,5);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
