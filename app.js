const myGameBoardModule = (()  => {
    'use strict';
    const _myGameBoard = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ]

    const myBoardRender = () => {
        for(let i=0; i < _myGameBoard.length; i++){
            for(let j=0; j < _myGameBoard[i].length; j++){
                const newDiv = document.createElement('div');
                newDiv.classList.add('cell');
                const divContainer = document.getElementById('divContainer');
                divContainer.insertBefore(newDiv, null);
            }
        }
    }
            
    return { myBoardRender }    
})();


const playerFactory = (name,mark) => {
    'use strict';
    const getName = () => name;
    const getMark = () => mark;
    

    return { getName, getMark }
};



const myGame = (() => {
    'use strict';
    //create instance of board
    myGameBoardModule.myBoardRender()
    //create two players
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2', 'O');
    
    
})();








