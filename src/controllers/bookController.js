const { count } = require("console")
const { updateOne, findById } = require("../models/authorModel")
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


const updateKeyandPrice = async function (req,res){
    //let upTrueKey = await publisherModel.find({publisher:{$in:['Penguin','HarperCollins'] },isHardCover: true} ).select({_id:1})  //.populate('publisher')
   // { $set: { isHardCover: true} } 
   //console.log(upTrueKey)
   //let final= await authorModel.find({_id:"621f63a193cc8452da4d1d80",isHardCover: true})
   //res.send({data: final})
   //res.send({data:upTrueKey})
   let hardCoverPublishers = await publisherModel.find({
       name: {$in: ["Penguin","HarperCollins"]},
    });
    let publisherIds = hardCoverPublishers.map((p)=> p._id);
    await bookModel.updateMany(
        {publisher: {$in: publisherIds}},
        {isHardCover:true}
    );


    let highRatedAuthors = await authorModel.find({ rating: { $gt: 3.5 } });
    let authorIds = highRatedAuthors.map((a) => a._id);
  
    await bookModel.updateMany(
      { author: { $in: authorIds } },
      { $inc: { price: 10 } }
    );
  
    let updateKeyandPrice = await bookModel.find();
    res.send({ updatedBookCollection: updateKeyandPrice });
    
}

   
// const updatePrice =async function(req,res){
//    // let upPrice = await bookModel.find({ratings:{$gt :3.5}},bookModel.updateOne({ $inc: { price: 10 } }) )       //{sales : {$gt: 20}}    
//    //let upPrice=await bookModel.updateOne({ratings:{$gt :3.5}},{ $inc: { price: 10 } })   //.....
//    //let rate=await authorModel.find({ratings:{$gt:3.5}})
//    //let upPrice= await bookModel.updateOne({$inc: {price:10}})
//    let story = await bookModel.find({ratings:{$gt:3.5}}).populate('author').updateOne({$inc: {price:10}});
//    res.send({data: story})
// }

module.exports.createBook= createBook
//module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updateKeyandPrice=updateKeyandPrice
//module.exports.updatePrice=updatePrice
