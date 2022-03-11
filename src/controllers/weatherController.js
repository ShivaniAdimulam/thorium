let axios = require("axios")

let getWhether = async function (req, res) {
    try {
        let q = req.query.q
        let appid = req.query.appid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getTemperature  = async function (req, res) {
    try {
        //let temp = req.params.temp
        let q = req.query.q
        let appid = req.query.appid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather/?q=${q}&appid=${appid}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data.main.temp
        res.status(200).send({ temp: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getSorted= async function(req,res){
    try{
        let cities= ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray=[]
        for(i=0;i<cities.length;i++){
            let obj={city:cities[i]}
            let resp= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=67cae90b8c496cf2f077028b20642cde`)
            console.log(resp.data.main.temp)

            obj.temp=resp.data.main.temp
            cityObjArray.push(obj)
        }
        let sorted=cityObjArray.sort(function(a,b){return a.temp - b.temp})
        console.log(sorted)
        res.status(200).send({status:true,data:sorted})
    } catch(error){
        console.log(error)
        res.status(500).send({status:false,msg:"server error"})
    }
}


module.exports.getWhether=getWhether
module.exports.getTemperature=getTemperature
module.exports.getSorted=getSorted