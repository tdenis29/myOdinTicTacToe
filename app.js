const myGameBoardModule = (()  => {
    'use strict';
    //intialize gameboard as array on gameboard object
    const _myGameBoard = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
     
    ]
    const gameTable = () => {
        console.table(_myGameBoard);
    }
    //private method to render gameboard so no player has access to it?
    const myBoardWalk = (array) => {
        for(let i=0; i < _myGameBoard.length; i++){
            for(let j=0; j < _myGameBoard[i].length; j++){
                const newDiv = document.createElement('div');
                newDiv.classList.add('cell');
                const newP = document.createElement('p')
                newP.classList.add('mark');
                // const text = document.createTextNode(_myGameBoard[i][j]);
                // newP.appendChild(text);
                // newDiv.appendChild(newP);
             
                const divContainer = document.getElementById('divContainer');
                divContainer.insertBefore(newDiv, null);
            }
        }
    }
    
    //public method to write/update board with player choice playerChoice?
    return { gameTable, myBoardWalk }    
})();

const myGame = (() => {
    'use strict';

    //has the game started?

    //who's turn is it?

    // who is x and who is o?

    //has anybody won

    //has anybody written on that square before? needs access to gameboard

}
)




const playerFactory = (name,mark) => {
    'use strict';
    const getName = () => name;
    const getMark = () => mark;
    const playerMove = () => {
   
    };
    return { getName, getMark }
};

const player1 = playerFactory('player1', 'X');

const player2 = playerFactory('player2', 'O');



window.addEventListener('load', (e) =>{
    myGameBoardModule.myBoardWalk();
});
