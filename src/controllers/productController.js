const { count } = require("console")
const BookModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

module.exports.createProduct=createProduct
