const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    //author_id: String,
    authorName: String,
    age:Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('Newauthor', authorSchema)
