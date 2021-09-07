"use strict";
//square Factory
const squareFactory = (id=`${x}+${y}`, taken) => {
 

    
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

//player Factory
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


//Board Module will create a 2d array of new square objects
//module pattern
const BoardModule = (() => {
    // 'use strict';
    
    //private _rows var
    let _rows = 3;
    //private _columns var
    let _columns = 3;
    
    //public method using private varibales?
    function createSpaces() {
        let spaces = [];
        for(let x=0; x < _columns; x++){
            const column = [];
            for(let y=0; y < _rows; y++){
                let space = squareFactory(x,y)
                column.push(space);
            }
            spaces.push(column);
        }
        return spaces
    };

    function drawHTMLBoard() {
        for(let column of this.spaces){
            for(let space of column){
                space.drawhtmlSquares();
            }
        }
   }
    return {
        drawHTMLBoard, 
        spaces: createSpaces(),
    }

})();

const GameModule = (function() {
    "use strict";

    //will draw html board from array of square objects on click of start
   function startGame(){
    BoardModule.drawHTMLBoard()
    applyEvent()
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
    let player2 = playerFactory('Player2',"O");
    players.push(player2);
    return players
   }

   function getActivePlayer(){
    return this.players.find(player => player.active);
   }

   function handleClick(e){
    let board = BoardModule.spaces
    if(e.target.classList.contains("cell") && e.target.innerText === ""){
    let playerActive = GameModule.getActivePlayer();
    let mark = playerActive.getMark()
    let cell = e.target;
    cell.innerText = mark;
    let id = cell.id
    switchTurns();
    updateTaken(cell, mark)
    checkWin(mark, board )
   } else {
       return
   }
}
   function switchTurns(){
    for(let player of GameModule.players){
        player.active = player.active === true ? false : true;
    }
}
    function updateTaken(cell,mark){
               
            }
 
    function checkWin(mark, array){
        const owner = mark
        let win = false
        console.log(array)
        //horizontal win x is column and y is set to -2 which evaluates to zero each pass to check = [0][0], [1][0], [2][0]
        for (let x = 0; x < array.length; x++ ){
            for (let y = 0; y < array.length - 2; y++){
                if (array[x][y].taken == owner && 
    				array[x][y+1].taken == owner && 
    				array[x][y+2].taken == owner){
                        win = true
                        if(win){
                            console.log(`${owner}'s wins!`)
                        }
                    };
                }
            }
             //vertical win x is column and x is set to -2 which evaluates to zero each pass to check = [0][0], [0][1], [0][2]
            for (let x = 0; x < array.length - 2; x++ ){
                for (let y = 0; y < array.length; y++){
                    if (array[x][y].taken === owner && 
                        array[x+1][y].taken === owner && 
                        array[x+2][y].taken === owner){
                            win = true
                            if(win){
                                console.log(`${owner}'s wins!`)
                               
                            }
                        };
                    }
                }
                //diagonal win 
                
            return win 
        }
  return {
    
    startGame,
    applyEvent,
    players: createPlayers(),
    getActivePlayer,
    handleClick,
    switchTurns,
    updateTaken,
    checkWin, 

  }
})();












