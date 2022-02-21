const express = require('express');
let obj = require('../logger/logger')
let obj1 = require('../util/helper')
let obj2 = require('../validator/formatter')
const router = express.Router();
const app= express();


obj.welcome()

obj1.printDate()
obj1.printMonth()
obj1.getbatchinfo()

obj2.greeting;
obj2.sentence;
obj2.sentence2;

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// router.get('/hello', function(req,res){
//     let month= ["January","February","March","April","May","June","July",
// "August","September","October","November","December"];

//     res.send(_.chunk(["January","February","March","April","May","June","July",
// "August","September","October","November","December"],4))

// });

app.get("/hello",(req,res)=>{
    res.send("welcome")
});

module.exports = router;