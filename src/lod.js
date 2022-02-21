const express= require("express");
const app= express();
// const port=8000;
const _ = require("lodash");
let month= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

console.log(_.chunk(["January","February","March","April","May","June","July",
"August","September","October","November","December"],4))




let x = [1,3,5,7,9,11,13,15,17,19]
  
let newArray = _.tail(x);
  
console.log(newArray);



// Use of _.union() method 
let gfg = _.union([1, 2, 3],
    [3, 4, 5], 
    [6, 2, 7],
    [5,6,7],
    [2,9,3]); 

// Printing the output  
console.log(gfg)


let pairs = [['horror', 'The Shining' ] , ['drama','Titanic'], ['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
  
let obj = _.fromPairs(pairs);
  
console.log(obj)

// app.get("/hello",(req,res)=>{
//     res.send("welcome")
// });

// app.listen(port, ()=>{
//     console.log(`listening  to the port no ${port}`);
// });
//     module.exports ={month}