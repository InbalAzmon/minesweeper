// function printMat(mat, selector) {
//     var strHTML = '<table class="table" border="0"><tbody>';
//     for (var i = 0; i < mat.length; i++) {
//       strHTML += '<tr>';
//       for (var j = 0; j < mat[0].length; j++) {
//         var cell = mat[i][j];
//         var className = 'cell cell' + i + '-' + j;
//         strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//       }
//       strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
//   }
//   function createMat(ROWS, COLS) {
//     var mat = []
//     for (var i = 0; i < ROWS; i++) {
//         var row = []
//         for (var j = 0; j < COLS; j++) {
//             row.push('')
//         }
//         mat.push(row)
//     }
//     return mat
// }
//   // location such as: {i: 2, j: 7}
//   function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//     elCell.innerHTML = value;
//   }
  
//   function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
  
//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min) + min)
//   }
//   function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
    
//       for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//       }
//     if (color === '#000000') color = '#0000ff'; 
//     return color;
//   }
  
//   function getRandomEmptyLocation() {
//     if (gGame.score !== 0) {
//       var rowIdx = getRandomInt(0, 10)
//       var colIdx = getRandomInt(0, 10)
//       var cell = gBoard[rowIdx][colIdx];
//       debugger;
//       while (cell !== EMPTY) {
//         rowIdx = getRandomInt(0, 10)
//         colIdx = getRandomInt(0, 10)
//         cell = gBoard[rowIdx][colIdx];
//       }
  
//       return { i: rowIdx, j: colIdx }
//     }
//   }


//   function renderBoard(board) {
//     var strHtml = '';
//     for (var i = 0; i < board.length; i++) {
//         var row = board[i];
//         strHtml += '<tr>';
//         for (var j = 0; j < row.length; j++) {
//             var cell = row[j];
//             // figure class name
//             var className = ((i + j) % 2 === 0) ? 'white' : 'black';
//             var tdId = `cell-${i}-${j}`;

//             strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
//                             ${cell}
//                         </td>`
//         }
//         strHtml += '</tr>';
//     }
//     var elMat = document.querySelector('.game-board');
//     elMat.innerHTML = strHtml;
// }


// function markCells(coords) {
//   for (var i = 0; i < coords.length; i++) {
//       var coord = coords[i];
//       var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
//       elCell.classList.add('mark')
//   }
// }
// // Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
// function getCellCoord(strCellId) {
//   var parts = strCellId.split('-')
//   var coord = { i: +parts[1], j: +parts[2] };
//   return coord;
// }

// function cleanBoard() {
//   var elTds = document.querySelectorAll('.mark, .selected');
//   for (var i = 0; i < elTds.length; i++) {
//       elTds[i].classList.remove('mark', 'selected');
//   }
// }

// function isEmptyCell(coord) {
//   return gBoard[coord.i][coord.j] === ''
// }


// function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
//   var res = [];

//   var diff = (isWhite) ? -1 : 1;
//   var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
//   if (isEmptyCell(nextCoord)) res.push(nextCoord);
//   else return res;

//   if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
//       diff *= 2;
//       nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
//       if (isEmptyCell(nextCoord)) res.push(nextCoord);
//   }
//   return res;
// }



// function getAllPossibleCoordsRook(pieceCoord) {
//   var res = [];
//   for (var i = pieceCoord.i - 1; i >= 0; i--) {
//       var coord = { i: i, j: pieceCoord.j }
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }
//   for (var i = pieceCoord.i + 1; i < 8; i++) {
//       var coord = { i: i, j: pieceCoord.j }
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }
//   for (var j = pieceCoord.j + 1; j < 8; j++) {
//       var coord = { i: pieceCoord.i, j: j }
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }
//   for (var j = pieceCoord.j - 1; j >= 0; j--) {
//       var coord = { i: pieceCoord.i, j: j }
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }
//   return res;
// }

// function getAllPossibleCoordsBishop(pieceCoord) {
//   var res = [];

//   // right top diagonal
//   var i = pieceCoord.i - 1;
//   for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
//       var coord = { i: i--, j: idx };
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }

//   //left top diagonal

//   i = pieceCoord.i - 1;

//   for (var idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
//       var coord = { i: i--, j: idx };
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }

//   // right bottom diagonal
//   i = pieceCoord.i + 1

//   for (var idx = pieceCoord.j + 1; i < 8 && idx < 8; idx++) {
//       var coord = { i: i++, j: idx };
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }

//   // left bottom diagonal
//   i = pieceCoord.i + 1

//   for (var idx = pieceCoord.j - 1; i < 8 && idx >= 0; idx--) {
//       var coord = { i: i++, j: idx };
//       if (!isEmptyCell(coord)) break;
//       res.push(coord);
//   }

//   return res;
// }

// function getAllPossibleCoordsKing(pieceCoord) {
//   var res = [];
//   for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
//       if (i < 0 || i === 8) continue;
//       for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
//           if (i === pieceCoord.i && j === pieceCoord.j) continue;
//           if (j < 0 || j === 8) continue;
//           if (isEmptyCell({ i, j })) res.push({ i, j });
//       }
//   }
//   return res;
// }

// function getAllPossibleCoordsQueen(pieceCoord) {
//   var allRookCoords = getAllPossibleCoordsRook(pieceCoord)
//   var allBishopCoords = getAllPossibleCoordsBishop(pieceCoord)
//   var res =allRookCoords.concat(allBishopCoords)
//   return res
// }

// function getAllPossibleCoordsKnight(pieceCoord) {
//   var res = [];
//   var iIdx = pieceCoord.i
//   var jIdx = pieceCoord.j
//   var coord = null;
  
//   coord = { i: iIdx - 2, j: jIdx - 1 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx - 2, j: jIdx + 1 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx + 2, j: jIdx - 1 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx + 2, j: jIdx + 1 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx + 1, j: jIdx + 2 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx - 1, j: jIdx +2 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx + 1, j: jIdx -2 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }
//   coord = { i: iIdx - 1, j: jIdx - 2 };
//   if (coord.i >= 0 && coord.i <= 7 && coord.j >= 0 && coord.j <= 7) {
//       if (isEmptyCell(coord)) res.push(coord);
//   }

//   return res;
// }
