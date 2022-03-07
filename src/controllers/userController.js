const UserModel= require("../models/userModel")
//const mongoose = require('mongoose');

const createUser= async function (req, res) {
    let data= req.body
    let isFree= data.isFreeAppUser
    if(!isFree) return res.send('The request is not valid as the isFreeAppUser  field is  required.')

    let savedData= await UserModel.create(data)
    //console.log(req.newAtribute)
    res.send({msg: savedData})
}

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     console.log(req.newAtribute)
//     res.send({msg: allUsers})
// }

module.exports.createUser= createUser
//module.exports.getUsersData= getUsersData

//