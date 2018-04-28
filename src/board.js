export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    } //check if tile is not empty, there is a bomb at that tile, otherwise displays number of neighboring bombs
    this._numberOfTiles -= 1;
  } //closing bracket for flipTile function
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]
    ]; //stores [rowOffset,columnOffset] for adjacent neighboring tiles
    //const neighborIndex = [-1,0,1]; //offset values of possible neighboring tiles
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length; //equal to length of first element
    let numberOfBombs = 0; //initialize board const with no bombs
    /*
    for (let row of neighborIndex) {
      for (let column of neighborIndex) {
        neighborOffsets.push([row,column]); //populates neighborOffsets with all possible combinations, how can I remove a single array [0,0]?
      } //closing bracket of nested for loop
    } //closing bracket of 'for' loop
    */
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0]; //offset represents a nested array in neighborOffsets
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >=0 &&
          neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 &&
          neighborColumnIndex < numberOfColumns) { //check if row and column indeces for neighboring tiles are valid
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') { //check if neighboring tiles contain a '[B]omb'
          numberOfBombs++; //increment bomb counter if space we index to is 'valid' and contains a 'bomb'
        } //closing bracket of nested if statement
      } //closing bracket of if statement
    }); //closing bracket of neighborOffsets.forEach()
    return numberOfBombs; //output for function
  } //closing bracket for getNumberOfNeighborBombs function
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  } //closing bracket of hasSafeTiles()
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n')); //joins elements of 'board' array rows with ' | ' then joins array rows with 'newline' character
  }
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let numRows=0; numRows<numberOfRows; numRows++) { //for{will create one empty row array for specified number of rows}
      let row = [];
      for (let numCols=0; numCols<numberOfColumns; numCols++) { //length of row is determined by # of columns
        row.push(' '); //adds 'emptyspace' to 'row' array
      }
      board.push(row);
    }
    return board;
  } //closing bracket of generatePlayerBoard
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let numRows=0; numRows<numberOfRows; numRows++) { //for{will create one empty row array for specified number of rows}
      let row = [];
      for (let numCols=0; numCols<numberOfColumns; numCols++) { //length of row is determined by # of columns
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B'; //array indexing: array[row][column]
        numberOfBombsPlaced++;
      }
    }
    return board;
  } //closing bracket of generateBombBoard
} //closing bracket of Board class
