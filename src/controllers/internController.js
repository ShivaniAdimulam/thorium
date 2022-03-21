const { count } = require("console")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel");
const { default: mongoose } = require("mongoose");


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// const isValidObjectId = function (objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }

const createIntern = async function (req, res) {
    try {

        let requestBody = req.body
        let collegeid = requestBody.collegeId




        if (!collegeid) return res.status(400).send("Request is not valid as the author id (details) required")

        let college = await collegeModel.findById(collegeid)
        if (!college) return res.status(400).send("Request is not valid as no author is present with the given author id")

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'invalid request parameters.please provide blog details' })
            return
        }

        const { name, email, mobile,collegeId, isDeleted } = requestBody

        if (!requestBody.name) { return res.status(400).send({ status: false, msg: "name is required" }) }

        if (!requestBody.email) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!requestBody.mobile) { return res.status(400).send({ status: false, msg: "mobile number is required" }) }

        // if (!isValidObjectId(collegeId)) { return res.status(400).send({ status: false, msg: "${authorId} is not valid autorId" }) }

        const isEmailAlreadyUsed = await internModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: '${email} is already registerd email address' })
            return
        }
        const emailToValidate = req.body.email;
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let valid = emailRegexp.test(req.body.email);

        const mobiletovalidate = req.body.mobile;
        const mobRegex = /^\d{10}$/;
        let mobvalid = mobRegex.test(mobiletovalidate);

        let arr=await collegeModel.find({_id : collegeId}).populate("collegeId","firstName","college")
        const internData = {
            name,
            email,
            mobile,
            collegeId, //college.name,
            firstName: arr,
            isDeleted: isDeleted ? isDeleted : false,

        }


        if (valid == true && mobvalid == true) {
            let internCreated = await internModel.create(internData)
            return res.status(201).send({ message: 'new intern created successfully', data: internCreated })
        } else {
            res.send("please enter valid email id or mobile number")
        }




    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createIntern = createIntern
