"use strict";


//Player Factory will  assign player Objects X or O and name and active state = boolean
const playerFactory = (_name,_mark, active, ai) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;


    return {
        getName,
        getMark,
        active,
        ai
    }
}       

///Board Module will have three states "playing", "Win", "Tie"
// we will use these states to update the visual aspect of the game board 
//Board will create array of square objects

const BoardModule = (() => {
    "use strict";
    let _boardState = null;
    
    let squares = [0,1,2,3,4,5,6,7,8];

    function drawSelf (mark, cell) {
        let playerMark = document.createElement("p");
        let playerNode = document.createTextNode(mark);
        playerMark.appendChild(playerNode);
        playerMark.classList.add("mark")
        cell.appendChild(playerMark)
    }

    function getBoardState(){
        return _boardState
    }
    function updateBoardState(state){
      _boardState = state;
      return _boardState
    }
    function myRestart() {
        if(getBoardState()=== null || getBoardState() === "Win" || getBoardState()=== "tie"){
        location.reload()
    }
}
        return {
            squares,
            getBoardState,
            updateBoardState,
            drawSelf
        }
})()

const GameModule = (() => {

    const players = [];

    function startGame(){
        let state = BoardModule.getBoardState()
        if(state === null){
            BoardModule.updateBoardState("Playing")
            applyEvent();
        } else {
            return
        }
    }
    function resetGame(){
        let state = BoardModule.getBoardState()
        if(state == "Win" || state == "Tie"){
           startGame()
        }
    }

    function applyEvent(){
       let cells = document.getElementsByClassName("cell")
       let cellarray = Array.from(cells)
       cellarray.forEach(cell => {
        cell.addEventListener('click', GameModule.handleClick,false )
       })
    }

    function getPlayer1 () {
        let name = document.getElementById("playerName1").value
        let mark = document.getElementById("markMenu1").value
        let active = false
        let ai = document.getElementById("aiMenu1").value

        if(name === null || name === ""){
            name = `Player ${mark}`
        }
        if(mark === "X"){
         document.getElementById('X2').disabled = true;
         document.getElementById('O2').selected = true;
         active = true
        } else{
         document.getElementById('O2').disabled = true;
         document.getElementById('X2').selected = true;
        }
        if(ai === "false"){
            ai = false
        } else {
            ai = true
        }
        let player1 = playerFactory(name,mark,active, ai)
        players.push(player1)
    }

    function getPlayer2 () {
        let name = document.getElementById("playerName2").value
        let mark = document.getElementById("markMenu2").value
        let active = false
        let ai = document.getElementById("aiMenu2").value

        if(name === null || name === ""){
            name = `Player ${mark}`
        }
        if(mark === "X"){
         document.getElementById('X2').disabled = true;
         document.getElementById('O2').selected = true;
         active = true
        } else{
         document.getElementById('O2').disabled = true;
         document.getElementById('X2').selected = true;
        }
        if(ai === "false"){
            ai = false
        } else {
            ai = true
        }
        let player2 = playerFactory(name,mark,active, ai)
        players.push(player2)
    }
        
       function getActivePlayer(){
        return GameModule.players.find(player => player.active);
       }
       function getNotActivePlayer(){
        return GameModule.players.find(player => !player.active)
       }
       function switchTurns(){
        for(let player of GameModule.players){
            player.active = player.active === true ? false : true;
        }
       }
       function updateArray(mark, cell, array){
        for(let i = 0; i < array.length; i++){
            if(cell.id == i){
                array[i] = mark;
            }
        }
       }
    //    if(GameModule.players[0].ai === true && GameModule.players[1].ai === true){
    //     document.getElementById('startgame').click()
    //     setTimeout(() => {
    //         aiTakeTurn(aiModule.bestSpot( getActivePlayer(),BoardModule.squares));
    //       }, 1000);
    // } else if (getActivePlayer().ai === true){
    //     document.getElementById('startgame').click()
    //     setTimeout(() => {
    //         aiTakeTurn(aiModule.bestSpot(getActivePlayer(),BoardModule.squares));
    //       }, 1000);
    // } 
        function aiTakeTurn (space){
            if(BoardModule.getBoardState() === "Playing"){
            let playerActive = getActivePlayer()
            let htmlArray = document.getElementsByClassName('cell')
            let thisHtml = Array.from(htmlArray)
            takeTurn(thisHtml.find(square => space.index === Number(square.id)), playerActive)
        }
    }

       function handleClick (e) {
           let playerActive = getActivePlayer()
           if(!e.target.firstChild && getActivePlayer().ai == false){
           takeTurn(e.target, playerActive)
           } else {
               return 
           }
       }
    
        function takeTurn(cell, playerActive) { 
            let array = BoardModule.squares
            let mark = playerActive.getMark()  
            BoardModule.drawSelf(mark, cell) 
            updateArray(mark, cell, array)
            
            if(checkWin(mark, array)){
                console.log(`${mark}` + " " + 'Wins')
            } else if (checkTie(array)){
                console.log(checkTie(array))
            
            }  
            switchTurns()
         
            if(getActivePlayer().ai === true){
                setTimeout(() => {
                    aiTakeTurn(aiModule.bestSpot(getActivePlayer(),BoardModule.squares));
                    console.log(aiModule.bestSpot(getActivePlayer(), BoardModule.squares))
                  }, 1000);
            }
            if(BoardModule.getBoardState() === "Win"){
                    removeEvent();
                }
       }

        function checkWin(mark, array){
            const owner = mark
            let win = false 
                for (let x = 0; x < array.length; x++ ){
                    if (array[0] == mark && array[1] == mark && array[2] == mark){
                            win = true   
                    } else if (array[3] == mark && array[4] == mark && array[5] == mark){
                                win = true
                            } else if (array[6] == mark && array[7] == mark && array[8] == mark){
                                win = true; 
                
                            }
                        }
                        for (let x = 0; x < array.length; x++ ){
                            if(array[0] == mark && array[3] == mark && array[6]== mark){
                                win = true
                            } else if (array[1] == mark && array[4] == mark && array[7] == mark){
                                win = true
                            } else if (array[2] == mark && array[5] == mark && array[8] == mark){
                                win = true
                          
                            }
                        }
                        for (let x = 0; x < array.length; x++ ){
                            if(array[6] == mark && array[4] == mark && array[2] == mark){
                                win = true
                            } else if (array[8] == mark && array[4] == mark && array[0] == mark){
                                win = true
                            }
                            }
                            return win 
                    }
            function checkTie( array){
                let tie;
                if(BoardModule.getBoardState() === "Playing"){
                    let count = 0
                    for(let i = 0; i < array.length; i++){
                        if(array[i] === "X" || array[i] === "O"){
                            count++
                        }
                    } 
                    if(count === 9){
                        tie = true
                    } else {
                        tie = false
                    }
            }
            return tie
            } 
             
            function removeEvent(){
                let cells = document.getElementsByClassName("cell")
                let cellarray = Array.from(cells)
                cellarray.forEach(cell => {
                    cell.removeEventListener('click', GameModule.handleClick,false )
                })
            }
      
    return {
        startGame,
        resetGame,
        applyEvent,
        getPlayer1,
        getPlayer2,
        players,
        getActivePlayer,
        switchTurns,
        handleClick,
        checkWin,
        checkTie,
        removeEvent,
        getNotActivePlayer
    }
})();

const aiModule = (() => {
    function bestSpot(player, newBoard){
        let availSpots = _emptySquares(newBoard);
     

        if (GameModule.checkWin(GameModule.getNotActivePlayer().getMark(), newBoard)) {
          return {score: -10};
        } else if (GameModule.checkWin(GameModule.getActivePlayer().getMark(), newBoard)) {
          return {score: 10};
        } else if (availSpots.length === 0) {
          return {score: 0};
        }
        
        var moves = [];

        for (let i = 0; i < availSpots.length; i ++) {
          var move = {};
          
          move.index = newBoard[availSpots[i]];
          
          newBoard[availSpots[i]] = player.getMark();

          if (player == GameModule.getActivePlayer())
            move.score = bestSpot(GameModule.getNotActivePlayer(), newBoard).score;
          else
            move.score =  bestSpot(GameModule.getActivePlayer(), newBoard).score;
          newBoard[availSpots[i]] = move.index
        
          if ((player === GameModule.getActivePlayer() && move.score === 10) || (player === GameModule.getNotActivePlayer() && move.score === -10))
            return move;
          else 
            moves.push(move);
        }
        let bestMove, bestScore;
        if (player === GameModule.getActivePlayer()) {
          bestScore = -1000;
          for(let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        } else {
            bestScore = 1000;
            for(let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }
        
        return moves[bestMove]
    
    }

    function _emptySquares(array){
        let empty = [];
        for(let i = 0; i < array.length; i++){
            if(array[i] !== "O" && array[i] !== "X"){
                empty.push(array[i])
            }
        }
          return empty
        }

    return{
        bestSpot,

    }
})();
