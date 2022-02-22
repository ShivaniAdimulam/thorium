const express = require('express');
// let obj = require('../logger/logger')
// let obj1 = require('../util/helper')
// let obj2 = require('../validator/formatter')
const router = express.Router();
//const app= express();


// obj.welcome()

// obj1.printDate()
// obj1.printMonth()
// obj1.getbatchinfo()

// obj2.greeting;
// obj2.sentence;
// obj2.sentence2;

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// router.get('/hello', function(req,res){
//     let month= ["January","February","March","April","May","June","July",
// "August","September","October","November","December"];

//     res.send(_.chunk(["January","February","March","April","May","June","July",
// "August","September","October","November","December"],4))

// });

// app.get("/hello",(req,res)=>{
//     res.send("welcome")
// });

//q1 22feb
router.get('/movies',function (req,res){
    res.send('["titanic","pink","pushpa","dabang","tiger"]')
});

//q2 and q3 22feb
router.get('/movies/:indexNumber', function(req,res){
    arr=["titanic","pink","pushpa","dabang","tiger"]
    let value = req.params.indexNumber;
    if (value>arr.length-1){
        res.send('Given index value is invalid...enter valid index value')
    }else{
        res.send(arr[value])
    }
});


//q4 
router.get('/films', function(req,res){
    res.send([ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Demo'
       }])
});

router.get('/films/:filmId', function(req,res){
    let mov=[ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Demo'
       }]
       let value=req.params.filmId;
       let found=false;
       for(i=0;i<mov.length;i++){
           if(mov[i].id==value){
               found=true
               res.send(mov[i])
               break
           }
       }
       if(found==false){
           res.send('No movie available for this id')
       }
});

module.exports = router;