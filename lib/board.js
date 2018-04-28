'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
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

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; //stores [rowOffset,columnOffset] for adjacent neighboring tiles
      //const neighborIndex = [-1,0,1]; //offset values of possible neighboring tiles
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length; //equal to length of first element
      var numberOfBombs = 0; //initialize board const with no bombs
      /*
      for (let row of neighborIndex) {
        for (let column of neighborIndex) {
          neighborOffsets.push([row,column]); //populates neighborOffsets with all possible combinations, how can I remove a single array [0,0]?
        } //closing bracket of nested for loop
      } //closing bracket of 'for' loop
      */
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0]; //offset represents a nested array in neighborOffsets
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          //check if row and column indeces for neighboring tiles are valid
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            //check if neighboring tiles contain a '[B]omb'
            numberOfBombs++; //increment bomb counter if space we index to is 'valid' and contains a 'bomb'
          } //closing bracket of nested if statement
        } //closing bracket of if statement
      }); //closing bracket of neighborOffsets.forEach()
      return numberOfBombs; //output for function
    } //closing bracket for getNumberOfNeighborBombs function

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    } //closing bracket of hasSafeTiles()

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n')); //joins elements of 'board' array rows with ' | ' then joins array rows with 'newline' character
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var numRows = 0; numRows < numberOfRows; numRows++) {
        //for{will create one empty row array for specified number of rows}
        var row = [];
        for (var numCols = 0; numCols < numberOfColumns; numCols++) {
          //length of row is determined by # of columns
          row.push(' '); //adds 'emptyspace' to 'row' array
        }
        board.push(row);
      }
      return board;
    } //closing bracket of generatePlayerBoard

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var numRows = 0; numRows < numberOfRows; numRows++) {
        //for{will create one empty row array for specified number of rows}
        var row = [];
        for (var numCols = 0; numCols < numberOfColumns; numCols++) {
          //length of row is determined by # of columns
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B'; //array indexing: array[row][column]
          numberOfBombsPlaced++;
        }
      }
      return board;
    } //closing bracket of generateBombBoard

  }]);

  return Board;
}(); //closing bracket of Board class