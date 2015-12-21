var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var printBoard = function(){
  for(var r = 0; r < board.length; r++){
    var newRow = $('<tr class="row' + r +'"></tr>' );
    for(var c = 0; c < board[r].length; c++){
      var newCol = $('<td class="col'+ c +'"></td>').text(board[r][c]);
      $(newRow).append(newCol);
    }
    $('table').append(newRow);
  }
}

$(document).ready(function(){
  printBoard();
});