class Square {
    constructor(x,y,id =`space-${x}-${y}`,taken= null){
        this.x = x;
        this.y = y;
        this.id = id 
        this.taken = taken;
    }
    htmlSquares(){
        const newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        newDiv.setAttribute('id', this.id)
        const divContainer = document.getElementById('divContainer');
        divContainer.insertBefore(newDiv, null);
    }
    mark(mark){
        this.taken = mark;
    }
}