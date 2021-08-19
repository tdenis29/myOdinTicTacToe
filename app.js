const myGameBoardModule = (()  => {
    'use strict';
    //intialize gameboard as array on gameboard object
    const _myGameBoard = [
        ['x','x','x'],
        ['o','o','o'],
        ['x','o','x']
    ]
    const gameTable = () => {
        console.table(_myGameBoard);
    }
    //private method to render gameboard so no player has access to it?
    const myBoardWalk = (array) => {
        for(let i=0; i < _myGameBoard.length; i++){
            for(let j=0; j < _myGameBoard[i].length; j++){
                console.log(_myGameBoard[i][j])
            }
        }
    }
    
    //public method to write/update board with player choice playerChoice?
    return { gameTable, myBoardWalk }    
})();

myGameBoardModule.myBoardWalk();

const myGameFlowModule = (() => {
    'use strict';
    //who's turn is it?

    // who is x and who is o?

    //has anybody won

    //has anybody written on that square before? needs access to gameboard

}
)

const Player = (name,playerChoice) => {
    'use strict';

    //assign x or o

    //what square in the matrix did the player choose? and is it legal?
    

}


