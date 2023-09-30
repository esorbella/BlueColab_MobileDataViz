const express = require("express");
const fetch = require("node-fetch");
const fs = require('fs');

const outputPort = express();
outputPort.listen(3030, () => console.log("Server is attempting to startup...serving at localhost:3030"));
outputPort.use(express.static('quickSite'));

// update these parameters to change days
let startYear = "2023";
let startMonth = "09";
let startDay = "28";
let startHour = "00"; // hours are in GMT, so four/five hours ahead of us
let startMinute = "00";
let startSecond = "00";

let endYear = "2023";
let endMonth = "09";
let endDay = "30";
let endHour = "00";
let endMinute = "00";
let endSecond = "00";

let sourceA = "Odin";
let sourceB = "Alan";

// don't change
let utcOffsetHour = "00";
let utcOffsetMinute = "00";

// console.log(`https://api.bluecolab.cc/influx/sensordata/O/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`)


(async () => {
  try {                        
   const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceA}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    const data = await response.json();
    // console.log(data);
    fs.writeFile(`data/myfile${sourceA}.json`, JSON.stringify(data,null," "), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File saved successfully!');
        }
      });
    
  }


  catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

(async () => {
  try {                        
   const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceB}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    const data = await response.json();
    // console.log(data);
    fs.writeFile(`data/myfile${sourceB}.json`, JSON.stringify(data,null," "), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File saved successfully!');
        }
      });
    
  }


  catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
