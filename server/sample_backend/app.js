require('dotenv').config();

const express = require("express");
const fetch = require("node-fetch");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
});

const SampleSchema = new mongoose.Schema({
  text: String,
  number: Number
})

const Sample = mongoose.model("Sample", SampleSchema);

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
    //TEST TO CONNECT TO MONGODB DATABASE REMOVE LATER
    const query = await Sample.find({text: "hello"});
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
