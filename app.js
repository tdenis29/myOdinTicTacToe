// "use strict";


var myFunction = function () {
    var name = 'Todd';
    var myOtherFunction = function () {
      console.log('My name is ' + name);
    };
    console.log(name);
    myOtherFunction(); // call function
  };
myFunction();
