require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
});

const waterDataSchema = new mongoose.Schema({
  Cond: Number,
  DOpct: Number,
  Sal: Number,
  Temp: Number,
  Turb: Number,
  pH: Number,
  timestamp: String,
  MonthYear: String
});

const weatherDataSchema = new mongoose.Schema({
  Rain: Number,
  AirTemp: Number,
  RelHumid: Number,
  WindSpeed: Number,
  BaroPressure: Number,
  VaporPressure: Number,
  timestamp: String,
  MonthYear: String
});

const wqiSchema = new mongoose.Schema({
  Location: String,
  wqi: Number,
  MonthYear: String
})

const ChoateWaterDoc = mongoose.model("ChoateWaterDoc", waterDataSchema);
const ChoateWeatherDoc = mongoose.model("ChoateWeatherDoc", waterDataSchema);
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

app.get("/Weather/Choate/:month", async function(req, res)
{
  try {
    var docs = await ChoateWeatherDoc.find({MonthYear: req.params.month});
    var aggArray = []
    for (let i = 0; i < docs.length; i+=15)
    {
      aggArray.push(docs[i]);
    }
    res.json(aggArray);
  }
  catch (error)
  {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

app.get("/WQI/Choate/:month", async function(req, res) {
  try{
    console.log(req.params.month);
    const genwqi = findWQI(req.params.month);
    const wqi = await returnWQI(req.params.month);
    res.json(wqi);
  }
  catch (error)
  {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

app.get("/delete", async function (req, res){
  try{
    deleteDocs();
    await res.status(200).send("yay you did it");
  }
  catch (error){
    console.error(error);
  }
    
})

async function deleteDocs()
{
  //TODO: delete docs so we don't query through EVERY SINGLE DOC in weather.
}

async function findWQI()
{
   let wqiArray = [];
   const DOw = 0.34;
   const PHw = 0.22;
   const TEMPw = 0.2;
   const COw = 0.08;
   const TURw = 0.16;
   
   var docs = await ChoateWaterDoc.find({MonthYear: "01-2023"}).exec();
   docs.forEach(function(doc){
    wqi =  doc.DOpct * DOw + doc.Cond * COw + doc.Temp * 
    TEMPw + doc.Turb * TURw + doc.pH * PHw;
    wqiArray.push(wqi);
  });
  const sum = wqiArray.reduce((acc, num) => acc + num, 0);
  const average = sum / wqiArray.length;
  
  await wqiDoc.create({Location: "Choate Pond", wqi: average, MonthYear: "11-2023"})
  return "yay you did it";
};

async function returnWQI(month)
{
  const doc = await wqiDoc.find({MonthYear: month}).exec();
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