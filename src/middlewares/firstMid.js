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

// let userId = req.params.userId;
// let user = userModel.findById(userId);
// if(!user){
//     return res.send("No such user exist");
// }

next()

}


module.exports.mid=mid





