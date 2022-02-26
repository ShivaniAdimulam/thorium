const BookModel=require("../models/bookModel")


const createBook= async function(req,res){
    let data1=req.body
    let sData= await BookModel.create(data1)
    res.send({msg: sData})
}

const getBook=async function(req,res){
    let allBooks=await BookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBook=createBook
module.exports.getBook=getBook