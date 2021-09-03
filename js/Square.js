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


// const Person = function(name, age) {
//     this.sayHello = () => console.log('hello!');
//     this.name = name;
//     this.age = age;
//   };
  
//   const jeff = new Person('jeff', 27);


//   const personFactory = (name, age) => {
//     const sayHello = () => console.log('hello!');
//     return { name, age, sayHello };
//   };
  
//   const jeff = personFactory('jeff', 27);
  
//   console.log(jeff.name); // 'jeff'
  
//   jeff.sayHello(); // calls the function and logs 'hello!'