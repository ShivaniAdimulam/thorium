const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {type: String, required: true}, 
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10},
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    //  }
    summary :  mongoose.Schema.Types.Mixed,
    isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users



// author=
// { 
//     fname: {type:String,
//             required:true}, 
//     lname: {type:String,
//             required:true }, 
//     title: {type: String,
//             required:true 
//             enum:["Mr", "Mrs", "Miss"]}, 
//     email: {required:true, unique:true}, 
//     password: {type: String ,required:true} 
// }


// blog=
// { 
// title: {type; String,
//         required:true}, 
// body: {type; String,
//     required:true}, 
// authorId: {type: ObjectId,
//            ref: "Newauthor",
//            required:true}, 
// tags: [String], 
// category: {type:String, 
//            required:true},

// subcategory: [String], createdAt, updatedAt, 
// deletedAt: { type: Date}, 
// isDeleted: {type:boolean, 
//             default: false}, 
// publishedAt: { type: Date}, 
// isPublished: {type:boolean, 
//               default: false}
// }





// { title: {mandatory}, body: {mandatory}, 
// authorId: {mandatory, refs to author model}, 
// tags: {array of string}, 
// category: {type:string, mandatory}, 
//     subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, 
//     createdAt, updatedAt, 
//     deletedAt: {when the document is deleted}, 
//     isDeleted: {boolean, default: false}, 
//     publishedAt: {when the blog is published}, 
//     isPublished: {boolean, default: false}}



//     const createAuthor = async function (req, res) {
//         //You can name the req, res objects anything.
//         //but the first parameter is always the request 
//         //the second parameter is always the response
//        try{
//         let data = req.body;
//         const emailToValidate = req.body.email;
//         const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//         let valid = console.log(emailRegexp.test(emailToValidate));
//         if(valid==true){
//         let savedData = await userModel.create(data);
        
//         res.status(200).send({ msg: savedData });
//        }else{
//            res.send("please enter valid email id")
//        }
//        }
//        catch(error){
//         console.log(error)
//         res.status(500).send({ msg: error.message })
//        }
//       };



//       const createBlog= async function (req, res) {
//         try{
//             let blog = req.body
//             let authorId = blog.authorId
        
    
//         if(!authorId) return res.status(400).send("Request is not valid as the author id (details) required" )
    
//         let author = await authorModel.findById(authorId)
//         if(!author) return res.status(400).send("Request is not valid as no author is present with the given author id")
    
//         let blogCreated =await bookModel.create(blog)
//         return res.status(200).send({data: blogCreated})
//         }catch(error){
//         console.log(error)
//         res.status(500).send({msg:error.message})
//         }
//       }


//       const getBlogsData= async function (req, res) {
//         try{
//             let authorId=req.query.authorId
//             let category=req.query.category
//             let tags=req.query.tags
//             let subcategory=req.query.subcategory
//         let allBlogs= await BlogModel.find( { isDeleted: false, isPublished: false } )
//         console.log(allBlogs)
//         if (allBlogs.length > 0 )  res.status(200).send({msg: allBlogs, condition: true})
//         else res.status(404).send({msg: "No blog found" , condition: false})
//         }catch(err){
//             console.log(err)
//             res.status(500).send({msg:err.message})
//         }
//     }



//     const updateBlogs= async function (req, res) {
//         let data = req.body
//         let blogId=req.params.blogId
//         let blog = await authorModel.findById(blogId)
//         if(blog){
//         let allBlogs= await BlogModel.findOneAndUpdate( 
//             { isDeleted: false} , //condition
//             {publishedAt : currenttime}, //update in data
//             {isPublished:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
         
//          res.status(200).send( { msg: allBlogs})
//         } else{
//             res.status(404).send({msg:"no blog found"})
//         }
//     }



// const deletePath= async function(req,res){
//     let blogId=req.params.blogId
//     let blog = await authorModel.findById(blogId)
//         if(blog){
//         let allBlogs= await BlogModel.findOneAndUpdate( 
//             { isDeleted: false} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//          res.status(200)
//         }else{
//             res.status(404).send({msg:"No Blog found"})
//         }
//     }



//     const deleteBlog= async function(req,res){
//         let category=req.query.category
//         let authorId=req.query.authorId
//         let tags = req.query.tags
//         let subcategory=req.query.subcategory
//         let isPublished=req.query.isPublished


//         let deleteblog= await BlogModel.findOneAndUpdate( 
//             { category: category} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//         if(deleteblog===null){
//             res.status(404).send({msg:"no blog found"})
//         }
        
//         let deletebyauthor= await BlogModel.findOneAndUpdate( 
//             { authorId: authorId} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//         if(deletebyauthor===null){
//             res.status(404).send({msg:"no blog found"})
//         }

//         let deletebyTags= await BlogModel.findOneAndUpdate( 
//             { tags: tags} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//         if(deletebyTags===null){
//             res.status(404).send({msg:"no blog found"})
//         }

//         let deletebySubcategory= await BlogModel.findOneAndUpdate( 
//             { subcategory: subcategory} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//         if(deletebySubcategory===null){
//             res.status(404).send({msg:"no blog found"})
//         }

//         let deletebyisPublished= await BlogModel.findOneAndUpdate( 
//             { isPublished: isPublished} , //condition
//             {isDeleted:true},  //ipdate in data
//             { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//          )
//         if(deletebyisPublished===null){
//             res.status(404).send({msg:"no blog found"})
//         }

//     }



//let deleteData = await blogModel.findOneAndUpdate(queryParams, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
