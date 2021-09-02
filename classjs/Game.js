class Game{
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }
    createPlayers(){
        const players = [];
        let player1 = new Player('Player1',"X" ,true)
        players.push(player1);
        let player2 = new Player('Player2',"O");
        players.push(player2);
        return players
        }
    get activePlayer(){
        this.players.find(player => player.active )
    }
    switchPlayers(){
        for(let player of this.players){
            player.active = player.active === true ? false : true;
        }
     }
    startGame(){
        this.board.drawHTMLBoard();
        this.ready = true; 
    }
    handleClick(e){
        console.log(e.target)
    }
}