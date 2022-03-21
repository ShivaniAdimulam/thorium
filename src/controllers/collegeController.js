const { count } = require("console")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel");
const { default: mongoose } = require("mongoose");
const { builtinModules } = require("module");

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const registerCollege = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
            return
        }

        const { name, fullName, logoLink, isDeleted } = requestBody
        if (!requestBody.name) { return res.status(400).send({ status: false, msg: "name is required" }) }
        if (!requestBody.fullName) { return res.status(400).send({ status: false, msg: "fullName is required" }) }
        if (!requestBody.logoLink) { return res.status(400).send({ status: false, msg: "logo link  is required" }) }


        const collegeData = {
            name,
            fullName,
            logoLink,
            isDeleted: isDeleted ? isDeleted : false,

        }

        let collegeCreated = await collegeModel.create(collegeData)
        return res.status(200).send({ message: 'new blog created successfully', data: collegeCreated })
    } catch (error) {

        console.log(error)
        res.status(500).send({ msg: error.message })

    }
}


const getCollegeDetails = async function (req, res) {
    try{
    let filterquery = { isDeleted: false }
    let queryParams = req.query

    if (isValidRequestBody(queryParams)) {
        const {collegeId,fullName} = queryParams

        if (queryParams.collegeId) {                                            // && isValidObjectId(collegeId)
            filterquery['collegeId'] = collegeId
        }

        if (queryParams.fullName) {
            filterquery['fullName'] = fullName.trim()
        }

    }

    let iDetails = await internModel.find({ collegeId: req.query.collegeId }, { select: { _id: 1, name: 1, email: 1, mobile: 1 } });

    let cDetails = await collegeModel.find({ fullName: req.query.fullName });  //or filterquery

    arr = [];
    arr.push(iDetails);

    cDetails.intrest = arr

    res.status(200).send({ msg: "Data for this college", data: cDetails, status: true })



    //let allBlogs = await BlogModel.find({ isDeleted: false,isPublished: true },{$or:[{category:category},{authorId:authorId},{tags:{$all:[tags]}},{subcategory:{$all:[subcategory]}}]}).populate("authorId")
    // const details = await collegeModel.find(filterquery)


    // const final= await collegeModel.find(filterquery).populate('intern')

    if (Array.isArray(cDetails) && cDetails.length===0) {
    res.status(404).send({ msg: "No details found", status: false })
    return
    }
}catch(error){
    res.status(500).send({msg:error.message})
}

    // res.status(200).send({ msg: "blogs list",data: blogs, status: true })

}

module.exports.registerCollege = registerCollege

module.exports.getCollegeDetails=getCollegeDetails