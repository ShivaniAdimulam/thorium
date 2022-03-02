const { count } = require("console")
//const { default: mongoose } = require("mongoose")
//const { findById } = require("../models/authorModel")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    if(!authorId) return res.send("Request is not valid as the author id (details) required" )

    let author = await authorModel.findById(authorId)
    if(!author) return res.send("Request is not valid as no author is present with the given author id")

    if(!publisherId) return res.send("Request is not valid as the publisher id (details) required")

    let publisher =await publisherModel.findById(publisherId)
    if(!publisher) return res.send("The Request is not valid as no publisher is present with the given publisher id")

    let bookCreated =await bookModel.create(book)
    return res.send({data: bookCreated})
    // let bookCreated = await bookModel.create(book)
     
    // let authorid = await bookModel.find().populate('_id')
    // //let id = authorid[0]._id
    // let id = authorid[0]
    // let publisherid = await bookModel.find().populate('_id')
    // let pid = publisherid[0]

    // if (bookModel.find('author')===undefined && bookModel.find('publisher')===undefined) {
    //     console.log("publisher and autor are required");
    // } else if(authorModel.findById(id)!=authorid){
    //     console.log("autor is not  present in database ")
    // }else if(publisherModel.findById(pid)!=publisherid){ 
    // console.log("publisher is not present in database")
    // }else{
    // console.log("all good")
    // }


    // if (book.author===authorid && book.publisher===publisherid) {
    //     if(authorModel.findById(id)===authorid){
    //         if(publisherModel.findById(pid)===publisherid){ 
    //             console.log("publisher is present")
    //         } else{
    //             console.log("publisher is not present in database")
    //         }
    //         console.log("autor is present ")
    //     }else{
    //         console.log("author is not present in author database")
    //     }
    //     console.log("all good!!");
    // } else {
    //     console.log("publisher and autor are required");
    // }
    //res.send({data: bookCreated})
}

// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher')
    res.send({data: specificBook})

}

module.exports.createBook= createBook
//module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
