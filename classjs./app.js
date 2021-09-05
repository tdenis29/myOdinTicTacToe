let game = new Game;

let start = document.getElementById('startgame');

start.addEventListener('click', e => {
    game.startGame();
})

let divContainer = document.getElementById('divContainer');

divContainer.addEventListener('click', e =>  {
    e.stopPropagation()
   game.handleClick(e);
})