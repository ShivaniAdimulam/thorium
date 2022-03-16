const AuthorModel= require("../models/authorModel")
const jwt = require("jsonwebtoken");
const loginAuthor = async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
  
    let author = await AuthorModel.findOne({ email: email, password: password });
    if (!author)
      return res.status(401).send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
    // Once the login is successful, create the jwt token with sign function
    // Sign function has 2 inputs:
    // Input 1 is the payload or the object containing data to be set in token
    // The decision about what data to put in token depends on the business requirement
    // Input 2 is the secret
    // The same secret will be used to decode tokens
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "thorium",
        
      },
      "Functionup"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
  };


  module.exports.loginAuthor=loginAuthor