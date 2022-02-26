const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const BookModel=require("../models/bookModel.js")
const UserController= require("../controllers/userController")
const BookController=require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook",BookController.createBook)
router.get("/getBook", BookController.getBook)

module.exports = router;