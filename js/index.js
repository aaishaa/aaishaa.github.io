var x = {txt: 'X', cl: 'x-move', svg: '<svg viewBox="0 0 100 100"><line id="line1" x1="10" y1="10" x2="90" y2="90" /><line id="line2" x1="90" y1="10" x2="10" y2="90" /></svg>'};
  var o = {txt: 'O', cl: 'o-move', svg: '<svg height="30vh" xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 80 80"><ellipse fill="none" stroke-width="10" cx="40" cy="40" id="svg_1" rx="35" ry="35" class="path"/></svg>'};

$(document).ready(function(){
var board = [];
  var currentBoard;
  //  player objects --- .svg method for future magic!
  var current = x;
  var count = 0;
  $('td').click(function(){
    var hasX = $(this).hasClass('x-move');
    var hasO = $(this).hasClass('o-move');
    if(hasX || hasO){   //  checks if cell is empty
      alert('already filled');
    }else{
      count++;
      $(this).css('content', current.txt);
      $(this).addClass(current.cl);
      currentBoard = getBoard();
      $(this).html(current.svg);  //** for future magic!
      var won = findWin();
      if(!won && count<9){   // if no win is found and the board isn't filled
        switchIt();            // other player's turn
      }else if (!won && count === 9) {    //  else if no win is found and board is filled
        $('p.status').text("It's a draw!"); // end game
      }
    }
  });

  function switchIt(){  // switches to other player's turn
    if(current === x){
        
        $('p.status').text('Player O, your turn!');
        return  current = o;
    } else {
      $('p.status').text('Player X, your turn!');
      return current = x;
    }
  }

  var getBoard = function(){  // pushes all td values into an array for analysis of values
    $('td').each(function(i, el){
      var txt;
      var hasX = $(this).hasClass('x-move');
      var hasO = $(this).hasClass('o-move');
      if(hasX){
        txt = 'X';
      }else if(hasO){
        txt = 'O';
      }else{
        txt = "";
      }
      var cl = $(this).attr('class');
      var cls = 'td.'+ cl.split(' ').join('.');
      var obj = {'index': i, 'txt': txt, 'class': cls};
      board[i] = obj;
    });
  console.log(board);
    return board;
  }
function matchMe(a, b, c){  // checks three values on the board to see if the current player has won
    var n = current;
    var m = n.txt;
    if(m === a['txt'] && m === b['txt'] && m === c['txt']){      // if win found in current group
      $(a['class']+', '+b['class']+', '+c['class']).addClass('win');    //  set current group to class 'win'
      setTimeout(function(){
        $('.game-container, .message').addClass("blur");
      $('.overlay').fadeIn("slow").css("display", "flex");
      $('div.overlay div p:nth-child(1)').text(m+ ' wins!');
      $('p.status').text('Player '+ m +', you start!');
      }, 1000);
      current = n;
      return true;
    }else{ return false;}
  }

  function findWin(){   // checks board for wins, returns true or false
    // array of winning match combos
    var matchArr = [ matchMe(board[0], board[1], board[2]), // first row
                    matchMe(board[3], board[4], board[5]), // second row
                    matchMe(board[6], board[7], board[8]), // third row
                    matchMe(board[0], board[3], board[6]), // 1st column
                    matchMe(board[1], board[4], board[7]), // 2nd column
                    matchMe(board[2], board[5], board[8]), // 3rd column
                    matchMe(board[0], board[4], board[8]), // 1st diagonal
                    matchMe(board[2], board[4], board[6]) // 2nd diagonal
                    ];
    var hasWin = false;
    console.log(matchArr);
    for(var i = 0; i < matchArr.length; i++){  // if a win is found, sets value of hasWin to true
      if (matchArr[i]){
        hasWin = matchArr[i];
        return hasWin;
      };
    }
   return hasWin;   // returns boolean hasWin
  }
 $("#replay").on("click",function(){
   $(".overlay").fadeOut("slow");
    $("td").each(function(){
      $(this).removeClass("x-move o-move win");
      $(this).html("");
    });
   $('.game-container, .message').removeClass("blur");
   // $('.message').text("")
    count = 0;
    board = [];
  });
});