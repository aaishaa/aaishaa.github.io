(function(){
var board = [];
  var currentBoard;
  //  player objects --- .svg method for future magic!
  var x = {txt: 'X', cl: 'x-move', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 83 83"><ellipse fill="none" stroke-width="17.5" cx="41.25" cy="41.25" id="svg_1" rx="32.5" ry="32.5" stroke="#000000" transform="rotate(-44.75409698486328 41.25000000000001,41.25) " class="path"/></svg>'};
  var o = {txt: 'O', cl: 'o-move', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 83 83"><ellipse fill="none" stroke-width="17.5" cx="41.25" cy="41.25" id="svg_1" rx="32.5" ry="32.5" stroke="#000000" transform="rotate(-44.75409698486328 41.25000000000001,41.25) " class="path"/></svg>'};
  var current = x;    // first player is X
  var count = 0;
  $('td').click(function(){
    var hasX = $(this).hasClass('x-move');
    var hasO = $(this).hasClass('o-move');
    if(hasX || hasO){   //  checks if cell is empty
      alert('already filled');
    }else{
      count++;
      $(this).text(current.txt);
      //$(this).html(current.svg);  ** for future magic!
      $(this).addClass(current.cl);
      currentBoard = getBoard();
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
        current = o;
        $('p.status').text('Player O, your turn!');
    } else {
      current = x;
      $('p.status').text('Player X, your turn!');
    }
  }

  var getBoard = function(){  // pushes all td values into an array for analysis of values
    $('td').each(function(i, el){
      var txt= $(this).text();
      var cl = $(this).attr('class');
      var cls = 'td.'+ cl.split(' ').join('.');
      var obj = {'index': i, 'text': txt, 'class': cls};
      board[i] = obj;
    });

    return board;
  }
  var matchMe = function(a, b, c){  // checks three values on the board to see if the current player has won
    var m = current.txt;
    if(m === a['text'] && m === b['text'] && m === c['text']){      // if win found in current group
      $(a['class']+', '+b['class']+', '+c['class']).addClass('win');    //  set current group to class 'win'
      $('p.status').text(m+ ' wins!');
      return true;
    }else{ return false;}
  }

  var findWin = function(){   // checks board for wins, returns true or false
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
    for(var i = 0; i < matchArr.length; i++){  // if a win is found, sets value of hasWin to true
      if (matchArr[i]){
        hasWin = matchArr[i];
        return hasWin;
      };
    }
   return hasWin;   // returns boolean hasWin
  }
  
})();