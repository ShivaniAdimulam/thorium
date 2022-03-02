const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "Newauthor"
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        ref: "Newpublisher"
    }


}, { timestamps: true });


module.exports = mongoose.model('Newbook', bookSchema)
