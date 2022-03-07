const { count } = require("console")
const productModel = require("../models/productModel")
const userModel= require("../models/userModel")
const orderModel = require("../models/orderModel")

const createOrder= async function (req, res) {
    let order = req.body
    let userId = order.userId
    let productId = order.productId

    //validation a
    if(!userId) return res.send('The request is not valid as the userr details are required.')

    //validation b
    let user = await userModel.findById(userId)
    if(!user) return res.send('The request is not valid as no user is present with the given user id')

    //validation c
    if(!productId) return res.send('The request is not valid as the product details are required.') 

    //validation d
    let product = await productModel.findById(productId)
    if(!product) return res.send('The request is not valid as no product is present with the given product id');
    
    let cond = req.header.isFreeAppUser
    let pr = productModel.price
    let bal =userModel.balance
    if(cond = true){
        
        await orderModel.updateOne( 
            { $set: {amount: 0} }, //update in data
            { new: true } ,
         )
        await orderModel.updateOne( 
            { $set: {isFreeAppUser: true} }, //update in data
            { new: true } ,
         )

    }else{
        if(pr<bal){
           await orderModel.updateOne({$set :{amount: pr}},{new:true})
          // $set: {isFreeAppUser : false}
           await orderModel.updateOne( 
            { $set: {isFreeAppUser: false} }, //update in data
            { new: true } ,
         )

        }
    }

    let orderCreated = await orderModel.create(order)
    return res.send({data: orderCreated})
}


module.exports.createOrder=createOrder 