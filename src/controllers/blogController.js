const { count } = require("console")
const BlogModel = require("../models/blogModel")
const AuthorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {
    //You can name the req, res objects anything.
    //but the first parameter is always the request 
    //the second parameter is always the response
    try {
        let data = req.body;
        const emailToValidate = req.body.email;
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let valid = emailRegexp.test(req.body.email);
        if (valid == true) {
            let savedData = await AuthorModel.create(data);

            res.status(200).send({ msg: savedData });
        } else {
            res.send("please enter valid email id")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
};



const createBlog = async function (req, res) {
    try {
        let blog = req.body
        let authorId = blog.authorId


        if (!authorId) return res.status(400).send("Request is not valid as the author id (details) required")

        let author = await AuthorModel.findById(authorId)
        if (!author) return res.status(400).send("Request is not valid as no author is present with the given author id")

        let blogCreated = await BlogModel.create(blog)
        return res.status(200).send({ data: blogCreated })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}


const getBlogsData = async function (req, res) {
    try {
        // let filterquery = { isDeleted: false, isPublished: true }
        // let myquery = req.query

        // let { authorId, category, tags, subcategory } = myquery
        // if (authorId || category || tags || subcategory) {

        //     filterquery["authorId"] = authorId
        //     filterquery["category"] = category
        //     filterquery["tags"] = tags
        //     filterquery["subcategory"] = subcategory


        //     // let authorId=req.query.authorId
        //     // let category=req.query.category
        //     // let tags=req.query.tags
        //     // let subcategory=req.query.subcategory
        // }
        // let allBlogs = await BlogModel.find(filterquery)
        // console.log(allBlogs)
        //const data=req.query
        let authorId= req.query.authorId
        let category=req.query.category
        let tags= req.query.tags
        let subcategory=req.query.subcategory
        //let allBlogs = await BlogModel.find({ isDeleted: false,isPublished: true },{$or:[{category:category},{authorId:authorId},{tags:{$all:[tags]}},{subcategory:{$all:[subcategory]}}]}).populate("authorId")
        let allBlogs = await BlogModel.find({isdeleted : false,isPublished:true, $or:[{category:category}, {authorId:authorId},{tags: {$all:[tags]}},{subcategory: {$all:[subcategory]}}]})

        console.log(allBlogs)
        if (allBlogs.length > 0) res.status(200).send({ msg: allBlogs, status: true })
        else res.status(404).send({ msg: "No blog found", status: false })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



const updateBlogs = async function (req, res) {
    try {
        //let data = req.body
        let title=req.body.title
        let body= req.body.body
        let tags=req.body.tags
        let subcategory=req.body.subcategory
        let blogId = req.params.blogId
        let blog = await BlogModel.findOne({ _id: blogId, isDeleted: false })
        // if (blog) {
        /// let allBlogs = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false },//condition
        //     {
        //         publishedAt: Date.now(), //update in data
        //         isPublished: true,title:title,body:body,$addToSet:{tags:tags},$addToSet:{subcategory:subcategory}
        //     },  //update in data
        //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
        // )

        /// res.status(200).send({ msg: allBlogs })
        let updatedblogs1=await BlogModel.findOneAndUpdate({_id:blogId,title:title,body:body},{new:true})

        
        let updatedBlogs=await BlogModel.findOneAndUpdate({_id:blogId},{$addToSet:{tags:tags},$addToSet:{subcategory:subcategory}},
            
            {new:true})
        let updatedblogs3=await BlogModel.findOneAndUpdate({_id:blogId},{isPublished:true,publishedAt:Date.now()},{new:true})

        res.status(200).send({ msg: updatedblogs3 })  

        // } else 
        if (blog == null) {
            res.status(404).send({ msg: "no blog found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



const deletePath = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await BlogModel.findById(blogId)
        if (blog) {
            let allBlogs = await BlogModel.findOneAndUpdate(
                { isDeleted: false }, //condition
                { isDeleted: true },  //update in data
                { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
            )
            res.status(200).send("done")
        } else {
            res.status(404).send({ msg: "No Blog found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



const deleteBlog = async function (req, res) {
    let input = req.query
        
        if(Object.keys(input).length == 0) return res.status(400).send({status: false, msg: "please provide input data" })

        let deletedBlog = await BlogModel.updateMany({ $and: [input, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        
        res.status(200).send()

//    const data = req.query
//         console.log(data)

//         if (data=={}) return res.status(400).send({ error: "Please enter some data to campare" })

//         //const timeDate = moment()

//         const dataforUpdation = { ...data , isDeleted : true , deletedAt : Date.now()}

//         const result = await BlogModel.updateMany(data, dataforUpdation , { new: true })

//         if (!result) res.status(404).send({ error: " No data found" })

//         res.status(200).send({ data: result })
    // let category = req.query.category
    // let authorId = req.query.authorId
    // let tags = req.query.tags
    // let subcategory = req.query.subcategory
    // let isPublished = req.query.isPublished


    // let deleteblog = await BlogModel.findOneAndUpdate(
    //     { category: category }, //condition
    //     { isDeleted: true },  //ipdate in data
    //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    // )
    // if (deleteblog === null) {
    //     res.status(404).send({ msg: "no blog found" })
    // }

    // let deletebyauthor = await BlogModel.findOneAndUpdate(
    //     { authorId: authorId }, //condition
    //     { isDeleted: true },  //ipdate in data
    //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    // )
    // if (deletebyauthor === null) {
    //     res.status(404).send({ msg: "no blog found" })
    // }

    // let deletebyTags = await BlogModel.findOneAndUpdate(
    //     { tags: tags }, //condition
    //     { isDeleted: true },  //ipdate in data
    //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    // )
    // if (deletebyTags === null) {
    //     res.status(404).send({ msg: "no blog found" })
    // }

    // let deletebySubcategory = await BlogModel.findOneAndUpdate(
    //     { subcategory: subcategory }, //condition
    //     { isDeleted: true },  //ipdate in data
    //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    // )
    // if (deletebySubcategory === null) {
    //     res.status(404).send({ msg: "no blog found" })
    // }

    // let deletebyisPublished = await BlogModel.findOneAndUpdate(
    //     { isPublished: isPublished }, //condition
    //     { isDeleted: true },  //ipdate in data
    //     { new: true } // new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
    // )
    // if (deletebyisPublished === null) {
    //     res.status(404).send({ msg: "no blog found" })
    // }

}


module.exports.createBlog = createBlog
module.exports.createAuthor = createAuthor
module.exports.getBlogsData = getBlogsData
module.exports.updateBlogs = updateBlogs
module.exports.deletePath = deletePath
module.exports.deleteBlog = deleteBlog
