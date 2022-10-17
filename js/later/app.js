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



const BoardModule = (() => {
    "use strict";
    let _boardState = null;
    
    function drawhtmlSquares (index){
        const newDiv = document.createElement('button')
        newDiv.classList.add('cell')
        newDiv.setAttribute('id', index)
        const divContainer = document.getElementById('divContainer')
        divContainer.insertBefore(newDiv, null)
    }
    const drawSelf = function (mark, cell) {
        let playerMark = document.createElement("p");
        let playerNode = document.createTextNode(mark);
        playerMark.appendChild(playerNode);
        playerMark.classList.add("mark")
        cell.appendChild(playerMark)
    }
    function createSpaces() {
        let spaces = [];
        for(let x=0; x < 9; x++){
            let space = x;
            spaces.push(space);
        }
        return spaces
    };
    function drawHTMLBoard() {
        let spaces = [];
        for(let x=0; x < 9; x++){
            let space = x;
            spaces.push(space);
        }
        for(let i =0; i < spaces.length; i++){
            drawhtmlSquares(spaces[i], i);
        }
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
            squares: createSpaces(),
            drawHTMLBoard,
            getBoardState,
            updateBoardState,
            myRestart,
            drawhtmlSquares,
            drawSelf
            
        }
})()