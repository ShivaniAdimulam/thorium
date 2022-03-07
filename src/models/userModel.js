//const mongoose = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    
    
        
        name: String,
        balance:{
                  type:Number,
                  default: 100     // Default balance at user registration is 100
                }, 
        address:String,
        age: Number,
        gender: {
                  type: String,
                  enum: ["male", "female", "other"]   // Allowed values are - “male”, “female”, “other”
                } ,                            
        isFreeAppUser: {type: Boolean,
                        default:false}, // Default false value.
        
   }, { timestamps: true });

module.exports = mongoose.model('Userall', userSchema) 


//users
//module.exports = mongoose.model('Userall', userSchema)


// String, Number
// Boolean, Object/json, array
 // firstName: String,
    // lastName: String,
    // mobile: {
    //     type: String,

    //     required: true
    // },
    // emailId: String,
    // gender: {
    //     type: String,
    //     enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    // },
    // age: Number,