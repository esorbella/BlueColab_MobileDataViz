require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
});

const sensorDataSchema = new mongoose.Schema({
  Cond: Number,
  DOpct: Number,
  Sal: Number,
  Temp: Number,
  Turb: Number,
  pH: Number,
  timestamp: String,
  MonthYear: String
});

const wqiSchema = new mongoose.Schema({
  Location: String,
  wqi: Number,
  MonthYear: String
})

const ChoateWaterDoc = mongoose.model("ChoateWaterDoc", sensorDataSchema);
const wqiDoc = mongoose.model("ChoateWQIDocs", wqiSchema);

const port = process.env.PORT || 3000;
/*
  Cloud server/API for visualization of monthly data collected from Choate Pond
  at Pace University.
*/

//Root of API
/*idea: use for home page, check if month data for current month is generated
by checking server date against last generated month report.
*/

app.get("/", async function(req, res) {
  try {
    //TEST TO CONNECT TO BLUECOLAB API REMOVE LATER
    const data = await findTurbidity();
    console.log(query);
    //SEND RESPONSE
    res.status(200).send(`Turbidity: ${data}`);
      }
  catch (error)
  {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

app.get("/WQI/Choate/10-2023", async function(req, res) {
  try{
    const wqi = await returnWQI();
    res.json(wqi);
  }
  catch (error)
  {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

async function findWQI()
{
   let wqiArray = [];
   const DOw = 0.34;
   const PHw = 0.22;
   const TEMPw = 0.2;
   const COw = 0.08;
   const TURw = 0.16;
   
   var docs = await ChoateWaterDoc.find({MonthYear: "10-2023"}).exec();
   docs.forEach(function(doc){
    wqi =  doc.DOpct * DOw + doc.Cond * COw + doc.Temp * 
    TEMPw + doc.Turb * TURw + doc.pH * PHw;
    wqiArray.push(wqi);
  });
  const sum = wqiArray.reduce((acc, num) => acc + num, 0);
  const average = sum / wqiArray.length;
  
  await wqiDoc.create({Location: "Choate Pond", wqi: average, MonthYear: "10-2023"})

};

async function returnWQI()
{
  const doc = await wqiDoc.find({MonthYear: "10-2023"}).exec();
  return doc[0];
}

//sample function called when root is accessed.
async function findTurbidity()
{
  const response = await fetch('https://colabprod01.pace.edu/api/influx/sensordata/');
  const data = await response.json();
  return data.sensors.Turb;
}

//listen on port
app.listen(port, function() {
  console.log(`Server running on port ${port}!`);
})
