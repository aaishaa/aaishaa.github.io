//(function(){
  // $('td').hover(function() {
  //     $(this).text('X');
  // }, function() {
  //     $(this).text('');
  // });
var r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3;
var board = [
        r1c1, r1c2, r1c3,
        r2c1, r2c2, r2c3,
        r3c1, r3c2, r3c3
            ];
  var currentBoard;
  var x = {txt: 'X', cl: 'x-move'};
  var o = {txt: 'O', cl: 'o-move'};
  var current = x;
  var count = 0;
  $('td').click(function(){
    count++;
    $(this).text(current.txt);
    $(this).addClass(current.cl);
    //if (count>=5){
    currentBoard = getBoard();
    var won = findWin(currentBoard, current);
    if(!won && count<9){
    //} 
      switchIt();
    }else if (!won && count === 9) {
      $('p.status').text("It's a draw!");
    }
    // $('p.status').text(current.txt+', your turn!');


  });

  function switchIt(){

    if(current === x){
        current = o;
        $('p.status').text('Player O, your turn!');
    } else {
      current = x;
      $('p.status').text('Player X, your turn!');
    }
  }

  var getBoard = function(){
    $('td').each(function(i, el){
      var txt= $(this).text();
      var cl = $(this).attr('class');
      var cls = 'td.'+ cl.split(' ').join('.');
      var obj = {'index': i, 'text': txt, 'class': cls};
      board[i] = obj;
      
    });

    return board;
  }
  var matchMe = function(play, a, b, c){
    if(play === a['text'] && play === b['text'] && play === c['text']){
      $(a['class']+', '+b['class']+', '+c['class']).addClass('win');
      $('p.status').text(play+ ' wins!');
      $('p.status').addClass('winner');
      return true;
    }else{ return false;}
  }

  var findWin = function(bd, player){
    var m = player.txt;

    var matchArr = [ matchMe(m, board[0], board[1], board[2]), // first row
                    matchMe(m, board[3], board[4], board[5]), //second row
                    matchMe(m, board[6], board[7], board[8]), //third row
                    matchMe(m, board[0], board[3], board[6]), //1st column
                    matchMe(m, board[1], board[4], board[7]), //2nd column
                    matchMe(m, board[2], board[5], board[8]), //3rd column
                    matchMe(m, board[0], board[4], board[8]), //1st diagonal
                    matchMe(m, board[2], board[4], board[6]) //2nd diagonal
                    ];
    var hasWin = false;
    for(var i = 0; i < matchArr.length; i++){
      if (matchArr[i]){
        hasWin = matchArr[i];
        return hasWin;
      };
    }
   return hasWin;


  }
  

  

//})();