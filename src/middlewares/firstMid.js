const {nextTick }= require("process");
 
function mid (req,res,next) {
    if (!req.header.isFreeAppUser) return res.send('The request is not valid as the isFreeAppUser are required....')
    else next()
}


module.exports.mid=mid