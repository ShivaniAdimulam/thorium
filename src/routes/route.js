const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
});


playersDetails = []
router.post("/players", function(req,res){
    let playerDetail = req.body
    let detail = true
    for(let i=0;i<playersDetails.length;i++){
        if(playersDetails[i]["name"]=== playerDetail["name"]){
            detail=false
            break
        }

    }
    if(detail == true){
        playersDetails.push(playerDetail)
        res.send("Details saved successfully")
    }else{
        res.send("Player details is already exist in the system")
    }
    console.log(playersDetails)
});

//quesstion 2 feb 23 -2022
// router.post("/players/:playerName/bookings/:bookingId", function(req,res){
//     let name = req.params.playerName
//     let bookI = req.params.bookingId
//     let isPlayerAbsent = true
//     for(let i=0;i<playersDetails.length;i++){
//         if(playerN==playersDetails[i]["Name"] && bookI!=playersDetails[i]["bookings"]["bookingNumber"]){
//             res.send(playersDetails["bookingNumber"]=bookI)
//         }else if(playerN!=playersDetails[i]["Name"]){
//             res.send("something not being found")

//         }else{
//             res.send("bookingalready done")
//         }
//     }

// });


router.post("/players/:playerName/bookings/:bookingId", function(req,res){
    let name = req.params.playerName
    //let bookI = req.params.bookingId
    let isPlayerAbsent = true
    for(let i=0;i<playersDetails.length;i++){
        if(name==playersDetails[i].name){
            isPlayerAbsent = false
        }
    }
    if(isPlayerAbsent){
        return res.send("Player not present")
    }
    let booking = req.body
    let bookingId = req.params.bookingId
    for(let i =0; i<playersDetails.length;i++){
        if(name==playersDetails[i].name){
            for(let j=0;j<playersDetails[i].bookings.length;j++){
                if(playersDetails[i].bookings[j].bookingNumber ==bookingId){
                    return res.send('booking with this id is already present for the player')
                }
            }
            playersDetails[i].bookings.push(booking)
        }
    }
    res.send(playersDetails)
});

module.exports = router;