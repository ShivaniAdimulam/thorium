const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    //author_id: String,
    authorName: String,
    age:Number,
    address:String,
    ratings:Number

}, { timestamps: true });

module.exports = mongoose.model('Newauthor', authorSchema)
