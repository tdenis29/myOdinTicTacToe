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
    switchTurns();
    let id = cell.id
    console.log(id)
    updateTaken(id, mark);
   }
}
   
   function switchTurns(){
    for(let player of GameModule.players){
        player.active = player.active === true ? false : true;
    }
}
    function updateTaken(id, mark){
      
    }


  return {
    
    startGame,
    players: createPlayers(),
    getActivePlayer,
    handleClick,
    switchTurns,
    updateTaken
    // placemark

  }
})();












