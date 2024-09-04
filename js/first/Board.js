"use strict";


const playerFactory = (name,mark, active, ai) => {
    'use strict';
    return {
        name,
        mark,
        active,
        ai
    }
}       

const BoardModule = (() => {
    "use strict";
    let startGameButton = document.getElementById('startgame')
    let defaultSquares = [0,1,2,3,4,5,6,7,8]
    let squares = [0,1,2,3,4,5,6,7,8];

    function drawSelf (mark, cell) {
        let playerMark = document.createElement("p");
        let playerNode = document.createTextNode(mark);
        playerMark.appendChild(playerNode);
        playerMark.classList.add("mark")
        cell.appendChild(playerMark)
    }

    function hidePlayerForm(e, player, id){
        let form = e.target.parentNode;
        form.classList.toggle("fade-out")
        fillInfo(player, id)
    }

    function fillInfo(obj, number){
        let {name, mark, ai} = obj
        let nameElement = `player${number}Name`
        let markElement = `player${number}Mark`
        let typeElement = `player${number}Type`  
        document.getElementById(`${nameElement}`).textContent = name
        document.getElementById(`${markElement}`).textContent = mark
    
        document.getElementById(`${typeElement}`).textContent = ai === true ? "AI" : "Human"
        if(number == 1){
            document.getElementById('player1Info').classList.add("visible")
        } 
        if(number == 2){
            document.getElementById("player2Info").classList.add("visible")
        }    
        if(GameModule.players.length === 2){
            document.getElementById('startgame').classList.toggle('visible')
        } 
    }
    function displayWinner(message){
        document.getElementById('winner').textContent = message
    }
    function restart(){
        window.location.reload()
    }
        return {
            squares,
            drawSelf,
            hidePlayerForm,
            fillInfo,
            displayWinner,
            restart
        }
})()

const GameModule = (() => {

    const players = [];

    function startGame(){
    applyEvent();
    if(getActivePlayer().ai === true && getNotActivePlayer().ai === true){
            aiTakeTurn(aiModule.bestSpot( getActivePlayer(),BoardModule.squares));
        }
        
    }

    function applyEvent(){
       let cells = document.getElementsByClassName("cell")
       let cellarray = Array.from(cells)
       cellarray.forEach(cell => {
        cell.addEventListener('click', GameModule.handleClick,false )
       })
    }

    function getPlayer (e) {
        let playerId = e.target.parentNode.dataset.player;
        let playerNumber = parseInt(playerId)
        let nameElement = `playerName${playerId}`
        let markElement = `markMenu${playerId}`
        let aiElement = `aiMenu${playerId}`
            let name = document.getElementById(nameElement).value
            let mark = document.getElementById(markElement).value
            let active = false
            let ai = document.getElementById(aiElement).value
    
            if(name === null || name === ""){
                name = `Player ${playerId}`
            }
            if(playerNumber === 1 && mark === "X"){
             document.getElementById('X2').disabled = true;
             document.getElementById('O2').selected = true;
             active = true
            } else if( playerNumber === 1 && mark === "0"){
             document.getElementById('O2').disabled = true;
             document.getElementById('X2').selected = true;
             active = false
            }
            if(playerNumber === 2 && mark === "X"){
                document.getElementById('X1').disabled = true;
                document.getElementById('O1').selected = true;
                active = true
            } else if(playerNumber === 2 && mark === "O"){
                document.getElementById('O1').disabled = true;
                document.getElementById('X1').selected = true;
                active = false
            }
            
            if(ai === "false"){
                ai = false
            } else {
                ai = true
            }
            let player = playerFactory(name,mark,active, ai)
            players.push(player)
            BoardModule.hidePlayerForm(e, player,playerId)
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

        function aiTakeTurn (space){
            let playerActive = getActivePlayer()
            let htmlArray = document.getElementsByClassName('cell')
            let thisHtml = Array.from(htmlArray)
            let thisHtmlCell = thisHtml.find(square => space.index === Number(square.id))
            takeTurn(thisHtmlCell, playerActive)
    }

       function handleClick (e) {
           let cell = e.target;
           let playerActive = getActivePlayer()
           takeTurn(e.target, playerActive)
           cell.removeEventListener('click', GameModule.handleClick)
    
       }
    
        function takeTurn(cell, playerActive) { 
            let array = BoardModule.squares
            let mark = playerActive.mark 
            if(checkTie(array) === false){

                BoardModule.drawSelf(mark, cell)

                updateArray(mark, cell, array)
                
                if(checkWin(mark, array)){
                    let message = (`${mark}` + " " + 'Wins')
                    BoardModule.displayWinner(message)
                    document.getElementById('restart').classList.add('visible')
                    document.getElementById('startgame').classList.toggle('visible')

                } else if (checkTie(array)){
                    let message = "Cat's Game"
                    BoardModule.displayWinner(message)
                    document.getElementById('restart').classList.add('visible')
                    document.getElementById('startgame').classList.toggle('visible')
                }  
                switchTurns()
                if(getActivePlayer().ai === true){
                    setTimeout(() => {
                        if(getActivePlayer().ai === true){
                            aiTakeTurn(aiModule.bestSpot( getActivePlayer(),BoardModule.squares));  
                        }
                      
                    }, 1000);
                }
            }
       }
       function gameLoop(){

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
        applyEvent,
        getPlayer,
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
     
        if (GameModule.checkWin(GameModule.getNotActivePlayer().mark, newBoard)) {
          return {score: -10};
        } else if (GameModule.checkWin(GameModule.getActivePlayer().mark, newBoard)) {
          return {score: 10};
        } else if (availSpots.length === 0) {
          return {score: 0};
        }
        
        var moves = [];

        for (let i = 0; i < availSpots.length; i ++) {
          var move = {};
          
          move.index = newBoard[availSpots[i]];
          
          newBoard[availSpots[i]] = player.mark;

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
        