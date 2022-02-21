function printDate(){
    var d= new Date();
let currentdate = d.getDate();
console.log("Today's date is", currentdate)
return currentdate;
}

function printMonth(){
    var d= new Date();
let currentmonth = d.getMonth()+1;
console.log("Current month is", currentmonth)
return currentmonth;
}

function getbatchinfo(){
    console.log('Thorium, W3D1, the topic for today is Nodejs module system')
}

module.exports ={printDate,printMonth,getbatchinfo}