const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {


    let bookList =await BookModel.find().select( { bookName: 1, authorName: 1, _id: 0})
    res.send({msg: bookList})

    
}


const getBooksInYear= async function(req,res){
    let yr= req.query.yr
    let getBookYr= await BookModel.find({year: {$eq:yr}})
    res.send({msg: getBookYr})

}

const getParticularBooks= async function(req,res){
    let value=req.params.bookn
    let partiBook = await BookModel.find({bookName:{$eq:value}})
    res.send({msg:partiBook})
    
}


const getXINRBooks= async function(req,res){

    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     })
    let getINR = await BookModel.find({"prices.indianPrice": {$in: ["100INR" , "200INR" ,"500INR" ]}})
    res.send({msg:getINR})

}

const getRandomBooks= async function(req,res){
    let getRbooks= await BookModel.find( {$or:[ {stockAvailable: true },  { totalPages: { $gt:500 }  }]})
    res.send({msg:getRbooks})
}



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks