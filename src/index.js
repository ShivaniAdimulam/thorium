const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const gMiddleware = function(req,res,next){
    let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  //let method = req.method;
  const url = req.originalUrl;
  const type =req.ip
  //let log = `[${formatted_date}] ${method}:${url}`;
  console.log(formatted_date,url,type);
  

}
 app.use(gMiddleware)



mongoose.connect("mongodb+srv://ShivaniAdimulam:6YVITVtB4JZQZ2Qb@cluster0.vhsq6.mongodb.net/shivaniadi17?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
