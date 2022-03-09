const {nextTick }= require("process");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
 
function mid (req,res,next) {
    let token =req.headers["x-Auth-Token"];
if (!token) token=req.headers["x-auth-token"];

if(!token) return res.send({ status: false, msg: "token must be present" });

console.log(token);
let decodedToken= jwt.verify(token,"functionup-thorium");
if(!decodedToken)
  return res.send({status:false, msg: "token is invalid"});


//userId for which the request is made. In this case message to be posted.
let userToBeModified = req.params.userId
//userId for the logged-in user
let userLoggedIn = decodedToken.userId

//userId comparision to check if the logged-in user is requesting for their own data
if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})


// let userId = req.params.userId;
// let user = userModel.findById(userId);
// if(!user){
//     return res.send("No such user exist");
// }

next()

}


module.exports.mid=mid




// const authenticate = function(req, req, next) {
//     //check the token in request header
//     //validate this token

//     next()
// }


// const authorise = function(req, res, next) {
//     // comapre the logged in user's id and the id in request
//     next()
// }