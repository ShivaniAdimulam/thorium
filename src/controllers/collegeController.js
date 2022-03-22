const { count } = require("console")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel");
const { default: mongoose } = require("mongoose");
const { builtinModules } = require("module");
const validator = require("../validator/validator");

// const isValidRequestBody = function (requestBody) {
//     return Object.keys(requestBody).length > 0
// }


const registerCollege = async function (req, res) {
    try {
        let requestBody = req.body
        if (!validator.isValidRequestBody(requestBody)) {
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
        return res.status(200).send({ message: 'new college created successfully', data: collegeCreated })
    } catch (error) {

        console.log(error)
        res.status(500).send({ msg: error.message })

    }
}


const getCollegeDetails = async function (req, res) {
    try{

        
        let body = req.query;
        if (!validator.isValidRequestBody(body)){
            return res.status(400).send({
                status: false,
                message: "Query parameter not found, Please provide a valid query to retrive the  details",
            });
        }
        else {
            let collegeName = req.query.collegeName;
            if(!validator.isValid(collegeName)){
                res.status(400).send({status:false,messege:"Please provide The College Name"});
                return
            }
            const lowerFormCollege = collegeName.toLowerCase();
            let college = await collegeModel.findOne({ name: lowerFormCollege,isDeleted:false});
            if (!college) {
                res.status(400).send({
                    status: false,
                    message: `The '${collegeName}' is not available or valid college name. Please enter a valid college name to search interns details.`,
                });
                return;
            } else {
                let collId = college._id;
                let name = college.name;
                let fullName = college.fullName;
                let logoLink = college.logoLink;

                let previousAppliedInterns = await internModel
                    .find({ collegeId: collId,isDeleted:false })
                    .select({ _id: 1, name: 1, email: 1, mobile: 1 });

                if (!previousAppliedInterns.length > 0) {
                    let Data = {
                        name: name,
                        fullName: fullName,
                        logoLink: logoLink,
                        interests: `there is no interns applied for ${fullName}`
                    };
                    res.status(200).send({status: true,data:Data});

                    return;
                } else {
                    let Data = {
                        name: name,
                        fullName: fullName,
                        logoLink: logoLink,
                        interests: previousAppliedInterns,
                    };
                    res.status(200).send({
                        status: true,
                        message: `Successfully retrived all interns details of ${fullName}`,
                        data: Data,
                    });
                }
            }
        }
    // let filterquery = { isDeleted: false }
    // let queryParams = req.query
    // const {collegeId,name} = queryParams



    // if (isValidRequestBody(queryParams)) {
    //     const {collegeId,name} = queryParams

    //     if (queryParams.collegeId) {                                            // && isValidObjectId(collegeId)
    //         filterquery['collegeId'] = collegeId
    //     }

    //     if (queryParams.name) {
    //         filterquery['name'] = name.trim()
    //     }

    // }


    // const collegeData = {
    //     name,
    //     fullName,
    //     logoLink,
    //     intrests:[]
    //    } 
    // let iDetails = await internModel.find({ collegeId: req.query.collegeId }).select({ _id: 1, name: 1, email: 1, mobile: 1 } );

    // let cDetails = await collegeModel.find({name:req.query.name}).populate('Intern');  //or filterquery
    
    // let intern= iDetails
    // // arr = [];
    // // let intern =arr.push(ab);
    // let emp=collegeData
    // emp["intrests"] = intern

    // res.status(200).send({ msg: "Data for this college", data: cDetails, status: true })



    //let allBlogs = await BlogModel.find({ isDeleted: false,isPublished: true },{$or:[{category:category},{authorId:authorId},{tags:{$all:[tags]}},{subcategory:{$all:[subcategory]}}]}).populate("authorId")
    // const details = await collegeModel.find(filterquery)


    // const final= await collegeModel.find(filterquery).populate('intern')

    // if (Array.isArray(cDetails) && cDetails.length===0) {
    // res.status(404).send({ msg: "No details found", status: false })
    // return
    // }
}catch(error){
    res.status(500).send({msg:error.message})
}

    // res.status(200).send({ msg: "blogs list",data: blogs, status: true })

}

module.exports.registerCollege = registerCollege

module.exports.getCollegeDetails=getCollegeDetails