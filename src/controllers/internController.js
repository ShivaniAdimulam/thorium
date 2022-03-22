const { count } = require("console")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel");
const { default: mongoose } = require("mongoose");
const validator = require("../validator/validator");



const createIntern = async function (req, res) {
    try {

        let requestBody = req.body
        let collegeid = requestBody.collegeId




        if (!collegeid) return res.status(400).send("Request is not valid as the college id is required")

        let college = await collegeModel.findById(collegeid)
        if (!college) return res.status(400).send("Request is not valid as no college is present with the given college id")

        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'invalid request parameters.please provide blog details' })
            return
        }
        //const {name,email,mobile,collegeName}=requestBody   //college.name,// firstName: arr,// isDeleted: isDeleted ? isDeleted : false,

        const { name, email, mobile,collegeId, isDeleted} = requestBody

        if (!requestBody.name) { return res.status(400).send({ status: false, msg: "name is required" }) }

        if (!requestBody.email) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!requestBody.mobile) { return res.status(400).send({ status: false, msg: "mobile number is required" }) }

        // if (!isValidObjectId(collegeId)) { return res.status(400).send({ status: false, msg: "${authorId} is not valid autorId" }) }

        const isEmailAlreadyUsed = await internModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: 'given email id  is already registerd email address,please enter another one ' })
            return
        }

        const ismobileAlreadyUsed = await internModel.findOne({ mobile });
        if (ismobileAlreadyUsed) {
            res.status(400).send({ status: false, message: 'given mobile number is already registerd,please enter another one ' })
            return
        }
        const emailToValidate = req.body.email;
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let valid = emailRegexp.test(req.body.email);

        const mobiletovalidate = req.body.mobile;
        const mobRegex = /^\d{10}$/;
        let mobvalid = mobRegex.test(mobiletovalidate);

        
        
        if(valid == false || mobvalid == false){
            res.send("please enter valid email id or mobile number")
        }

        // const trimName = name.trim(); //removing unneccesary spaces from name.
        // requestBody["name"] = trimName;
        
        // let find = await collegeModel.findOne({isDeleted:false,$or: [{ name: collegeName }, { fullName: collegeName.trim() }]}); //Accepting the trimed value of collegeName.
        // if (!find) {
        //   let CollegeName = collegeName.toLowerCase().split(" ").join(""); //converting college name to lowercase and removing unneccesary spaces.
  
        //   let againFind = await collegeModel.findOne({ name: CollegeName,isDeleted:false });
        //   if (!againFind) {
        //     return res.status(400).send({
        //       status: false,
        //       message: `The ${collegeName} doesn't exists`,
        //     });
        //   } else {
        //     let collegeId = againFind._id;
        //     requestBody["collegeId"] = collegeId;
        //     let college = againFind.fullName; //showing the college name in response to make it more specific.
  
        //     let savedData = await internModel.create(data);
        //     res.status(201).send({
        //       status: true,
        //       message: `Successfully applied for internship at ${college}`,
        //       data: savedData,
        //     });
        //     return;
        //   }
        // } else {
        //   let collegeId = find._id;
        //   let college = find.fullName;  //showing the college name in response to make it more specific.
        //   requestBody["collegeId"] = collegeId;
        //   let savedData = await internModel.create(requestBody);
        //   res.status(201).send({
        //     status: true,
        //     message: `Successfully applied for internship at ${college}`,
        //     data: savedData,
        //   });
        //   return;
        // }
        
        

        // let arr=await collegeModel.find({_id : collegeId}).populate("collegeId","firstName","college")
         

        if (valid == true && mobvalid == true) {
            let internCreated = await internModel.create(requestBody)
            return res.status(201).send({ message: 'new intern created successfully', data: internCreated })
        } 
        //else {
        //     res.send("please enter valid email id or mobile number")
        // }


       

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createIntern = createIntern
