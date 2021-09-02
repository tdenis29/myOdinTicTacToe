class Board {
    constructor(){
        this.rows = 3;
        this.columns = 3;
        this.spaces = this.createSpaces();
    }
    createSpaces(){
        let spaces = [];
        for(let x=0; x < this.columns; x++){
            const column = [];
            for(let y=0; y < this.rows; y++){
                let space = new Square(x,y)
                column.push(space);
            }
            spaces.push(column);
        }
        return spaces
    }
    drawHTMLBoard(){
        for(let column of this.spaces){
            for(let space of column){
                space.htmlSquares();
            }
        }
   }
}