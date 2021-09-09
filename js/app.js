document.getElementById('startgame').addEventListener('click', e => {
    GameModule.startGame();
})

document.getElementById("restart").addEventListener('click', e => {
    GameModule.resetGame()
})