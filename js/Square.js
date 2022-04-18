//spaces Factory Function to create space objects that will be instantiated by Board
//we need the location by adding id to each space and keep track of its state: empty, X's or O's

//Space will be resonsible for drawing the spaces to the dom
// class Space {
//     constructor(){
//         this.x = x;
//         this.y = y;
//         this.id = `space-${x}-${y}`;
//         this.taken = null;
//     }
// }

const squareFactory = (x,y, id =`space-${x}-${y}`, taken = null) => {

    return {x,y,id ,taken}
}


