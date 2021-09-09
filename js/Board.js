"use strict";
//square factory will set up the square Objects
//stored single dimensional array on Board object
//square objects can have three states, "null", "X", "0", 
//will need method to update states 
// we will check for win by checking the states at each Square Object in the array
const squareFactory = (id, taken) => {
    "use strict";

    
    const drawhtmlSquares = function htmlSquares(){
        const newDiv = document.createElement('div')
        newDiv.classList.add('cell')
        newDiv.setAttribute('id', id)
        const divContainer = document.getElementById('divContainer')
        divContainer.insertBefore(newDiv, null)
    }
    return {
        taken,
        id,
        drawhtmlSquares
    }
}
//PLayer Factory will  assign player Objects X or O and name and active state = boolean
const playerFactory = (_name,_mark, active) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;


    return {
        getName,
        getMark,
        active
    }
}       

// for(let player of GameModule.players){
//     player.active = player.active === true ? false : true;
// }
///Board Module will have three states "playing", "X's Win", "O win", "Tie"
// we will use these states to update the visual aspect of the game board 
//Board will create array of square objects
// let origBoard = Array.from(new Array(9).keys())
// console.log(origBoard)
const BoardModule = (() => {
    "use strict";
    let _boardState = null;
    let  _columns = 3;
    let _rows = 3

    function createSpaces() {
        let spaces = [];
        for(let x=0; x < _columns; x++){
            const column = [];
            for(let y=0; y < _rows; y++){
                let space = squareFactory(`${x}${y}`, null)
                column.push(space);
            }
            spaces.push(column);
        }
        return spaces
    };
    function drawHTMLBoard() {
        for(let column of this.squares){
            for(let space of column){
                space.drawhtmlSquares();
            }
        }
   }
    function getBoardState(){
        return _boardState
    }
    function updateBoardState(state){
      _boardState = state;
      return _boardState
        
    }
    function markHTML(mark, cell){
       let playerMark = document.createElement("p");
       let playerNode = document.createTextNode(mark);
       playerMark.appendChild(playerNode);
       playerMark.classList.add("mark")
       cell.appendChild(playerMark)

    }
    function myRestart() {
        if(getBoardState()=== null || getBoardState() === "Win" || getBoardState()=== "tie"){
        location.reload()
    }
}

        return {
            squares: createSpaces(),
            drawHTMLBoard,
            getBoardState,
            updateBoardState,
            markHTML,
            myRestart
            
        }
})()
//Game Module 
//will handle create instance of board
//keep track of turn 
//making a omve on board 
//validate move
//identify winner  
const GameModule = (() => {

    function startGame(){
        let state = BoardModule.getBoardState()
        if(state === null){
            BoardModule.drawHTMLBoard()
            BoardModule.updateBoardState("Playing")
            applyEvent();
        } else {
            return
        }
    }
    function resetGame(){
        let state = BoardModule.getBoardState()
        if(state == "Win" || state == "Tie"){
           window.location.reload()
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
    function createPlayers(){
        const players = [];
        let player1 = playerFactory('Player1',"X",true)
        players.push(player1);
        let player2 = playerFactory('Player2',"O", false);
        players.push(player2);
        return players
       }
       function getActivePlayer(){
        return GameModule.players.find(player => player.active);
       }
       function switchTurns(){
        for(let player of GameModule.players){
            player.active = player.active === true ? false : true;
        }
       }
       function updateTaken(id,mark, array){
        for (let i of array) {
            for (let j of i) {
              if(j.id == id){
                  j.taken = mark
              }
            }
          }
        }
       const handleClick = function (e) {
        if(BoardModule.getBoardState() === "Playing"){
        e.stopPropagation();
            if(e.target.classList.contains("cell") && e.target.innerText === ""){
                let array = BoardModule.squares;
                let playerActive = getActivePlayer()
                let mark = playerActive.getMark()
                let cell = e.target
                let id = cell.id
                BoardModule.markHTML(mark, cell)
                // cell.innerText = mark
        
                updateTaken(id,mark, array)
                switchTurns()
                if(!checkWin(mark, array)){
                    checkTie(array)
                } 
            
                if(BoardModule.getBoardState() === "Win" || BoardModule.getBoardState() === "Tie"){
                        removeEvent();
                    }
            
                }
        
            } 
    }
        function checkWin(mark, array){
            const owner = mark
            let win = false 
            //horizontal win x is column and y is set to -2 which evaluates to zero each pass to check = [0][0], [1][0], [2]
            for (let x = 0; x < array.length; x++ ){
                for (let y = 0; y < array.length - 2; y++){
                    if (array[x][y].taken == owner && 
                        array[x][y+1].taken == owner && 
                        array[x][y+2].taken == owner){
                            win = true
                            if(win){
                                BoardModule.updateBoardState(`Win`)
                                alert(`${owner}'s wins!`)
                            }
                        } 
                    }
                }
                 //vertical win x is column and x is set to -2 which evaluates to zero each pass to check = [0][0], [0][1], [0][2]
                for (let x = 0; x < array.length -2; x++ ){
                    for (let y = 0; y < array.length; y++){
                        if (array[x][y].taken === owner && 
                            array[x+1][y].taken === owner && 
                            array[x+2][y].taken === owner){
                               win = true
                                if(win){
                                    BoardModule.updateBoardState(`Win`)
                                    alert(`${owner}'s wins!`)
                                }
                            }
                        }
                }
                    for (let x = 0; x < array.length; x++ ){
                        for (let y = 0; y < array.length; y++){
                            if (array[x][y].taken === owner && 
                                array[x+1][y+1].taken === owner && 
                                array[x+2][y+2].taken === owner){
                                    win = true
                                    if(win){
                                        BoardModule.updateBoardState(`Win`)
                                        alert("diagonal")
                                        break;
                                    }
                                } else {
                                    for (let x = 0; x < array.length; x++ ){
                                        for (let y = 0; y < array.length; y++){
                                            if (array[x][y+2].taken === owner && 
                                                array[x+1][y+1].taken === owner && 
                                                array[x+2][y].taken === owner){
                                                   win = true
                                                    if(win){
                                                        BoardModule.updateBoardState(`Win`)
                                                        alert("diagonal")
                                                        break;
                                                    }
                                                } else {
                                                    return
                                                }
                                    }
                                }
                            }
                        }
                    }
                    return win 
                }
                function checkTie(array){
                    if(BoardModule.getBoardState() === "Playing"){
                    let count = 0;
                 array.forEach((e) => {
                     e.forEach((obj) => {
                         if(obj.taken){
                             count++
                         }
                     });
                 });
                 if(count === 9){
                    BoardModule.updateBoardState(`Tie!`)
                     alert("tie")
                 }
                } else {
                    return 
                }
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
        players: createPlayers(),
        getActivePlayer,
        switchTurns,
        handleClick,
        updateTaken,
        checkWin,
        checkTie,
        removeEvent
    }
})();

