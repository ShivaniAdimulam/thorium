const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
//const bookModel = require("../models/bookModel")
const { modelName } = require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

const allBooks = async function(req,res){
    const authorDetails= await AuthorModel.find({author_name: "Chetan Bhagat"})
    const id = authorDetails[0].author_id
    const booksName= await BookModel.find({author_id: id}).select({name:1})
    res.send({msg:booksName})
}


const updatedBookPrice = async function(req,res){
    const bookDetails = await BookModel.find({name:"Two states"})
    const id= bookDetails[0].author_id
    const authorN= await AuthorModel.find({author_id:id}).select({author_name:1,_id:0})

    const bkName = bookDetails[0].name
    const updatedPrice = await BookModel.findOneAndUpdate({name:bkName},{price:100},{new:true}).select({price:1,_id:0})
    res.send({msg:authorN, updatedPrice})
}

const authorName = async function(req,res){
    const booksId= await BookModel.find({price: {$gte:50, $lte:100}}).select({author_id:1, _id:0})
    const id = booksId.map(inp => inp.author_id)

    let temp =[]
    for(let i=0; i<id.length; i++){
        let x =id[1]
        const author= await AuthorModel.find({author_id:x}).select({author_name:1, _id:0})
        temp.push(author)
    }

    const authorName =temp.flat()

    res.send({msg:authorName})

}

module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.allBooks = allBooks
module.exports.updatedBookPrice = updatedBookPrice
module.exports.authorName= authorName