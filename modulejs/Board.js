"use strict";
//square Factory
const squareFactory = (x,y, id =`space-${x}-${y}`,taken=null) => {

        function htmlSquares(){
            const newDiv = document.createElement('div');
            newDiv.classList.add('cell');
            newDiv.setAttribute('id', this.id)
            const divContainer = document.getElementById('divContainer');
            divContainer.insertBefore(newDiv, null);
        }
        
        
    return {  htmlSquares, id, taken}
}

//player Factory
const Player = (_name,_mark, _active) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;
    return { getName, getMark, active: _active}
};


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
                space.htmlSquares();
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
    const board = BoardModule.drawHTMLBoard()
    return board
   }
 
   function createPlayers(){
    const players = [];
    let player1 = Player('Player1',"X",true)
    players.push(player1);
    let player2 = Player('Player2',"O");
    players.push(player2);
    return players
   }

   function getActivePlayer(){
    return this.players.find(player => player.active);
   }

   function handleClick(e){
    if(e.target.classList.contains("cell") && e.target.innerText === ""){
    let playerActive = this.getActivePlayer();
    let mark = playerActive.getMark()
    let cell = e.target;
    cell.innerText = mark;
    let id = cell.id
    switchTurns();
    updateTaken(id, mark)
    checkWin(mark, BoardModule.spaces)
   } else {
       return
   }
}
   function switchTurns(){
    for(let player of GameModule.players){
        player.active = player.active === true ? false : true;
    }
}
    function updateTaken(id,mark){
        let spacesArray = BoardModule.spaces;
        for (let i of spacesArray) {
            for (let j of i) {
              if(j.id == id){
                  j.taken = mark
              }
            }
          }
    }
    function checkWin(mark, array){
        const owner = mark
        console.log(owner)
        let win = false
        //horizontal win x is column and y is set to -2 which evaluates to zero each pass to check = [0][0], [1][0], [2][0]
        for (let x = 0; x < array.length; x++ ){
            for (let y = 0; y < array.length - 2; y++){
                if (array[x][y].taken === owner && 
    				array[x][y+1].taken === owner && 
    				array[x][y+2].taken === owner){
                        win = true
                        if(win){
                            console.log(`${owner}'s wins!`)
                        }
                    }
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
                        }
                    }
                }
                //diagonal win 
                for (let x = 0; x < array.length; x++ ){
                    for (let y = 0; y < array.length; y++){
                        console.log(array[x][y])
                        if (array[x][y].taken === owner && 
                            array[x+1][y+1].taken === owner && 
                            array[x+2][y+2].taken === owner){
                                
                                win = true
                                if(win){
                                    alert("diagonal")
                                    document.getElementById('divContainer').removeEventListener('click', function(e) {
                                        e.stopPropagation();
                                        GameModule.handleClick(e)
                                        passive = true
                                    },true)  
                                }
                            } else {
                        for (let x = 0; x < array.length; x++ ){
                        for (let y = 0; y < array.length; y++){
                            console.log(array[x][y])
                            if (array[x][y+2].taken === owner && 
                                array[x+1][y+1].taken === owner && 
                                array[x+2][y].taken === owner){
                                    
                                    win = true
                                    if(win){
                                        alert("diagonal")
                                        document.getElementById('divContainer').removeEventListener('click', function(e) {
                                            e.stopPropagation();
                                            GameModule.handleClick(e)
                                            passive = true
                                        },true)  
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
  return {
    
    startGame,
    players: createPlayers(),
    getActivePlayer,
    handleClick,
    switchTurns,
    updateTaken,
    checkWin, 

  }
})();












