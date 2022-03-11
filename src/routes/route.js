const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const memeController= require("../controllers/memeController")
const weatherController=require("../controllers/weatherController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/sessionsInDistrict",CowinController.getSession)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/getememe",memeController.getMemes)
//router.post("/makememe/:template_id/:text0/:text1/:username/:password",memeController.makeMeme)
router.post("/makememe",memeController.makeMeme)

router.get("/getweather",weatherController.getWhether)
router.post("/gettemp",weatherController.getTemperature)
router.get("/getsorted",weatherController.getSorted)
// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;