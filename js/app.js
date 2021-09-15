document.getElementById("createPlayer1").addEventListener('click', GameModule.getPlayer1,false );

document.getElementById("createPlayer2").addEventListener('click', GameModule.getPlayer2,false );

document.getElementById('startgame').addEventListener('click', e => {
    if(GameModule.players.length == 2){
        GameModule.startGame();
    } else {
        alert("Create Players first!")
    }
   
})

document.getElementById("restart").addEventListener('click', e => {
    GameModule.resetGame()
})