const express = require("express");
const fetch = require("node-fetch");
const fs = require('fs');

// update these parameters to change days
let startYear = "2023";
let startMonth = "02";
let startDay = "05";
let startHour = "00"; // hours are in GMT, so four/five hours ahead of us
let startMinute = "00";
let startSecond = "00";

let endYear = "2023";
let endMonth = "05";
let endDay = "28";
let endHour = "00";
let endMinute = "00";
let endSecond = "00";

let sourceA = "Alan";
let sourceB = "odin";

// don't change
let utcOffsetHour = "00";
let utcOffsetMinute = "00";

(async () => {
  try {                        
   const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceA}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    const data = await response.json();

    let wqi = [];

    DOw = 0.34
      pHw = 0.22
      TEMPw = 0.2
      SALw = 0.08
      TURw = 0.16
      console.log(data[0]);
    for (let measurment of data) {
      let temp = measurment;
      temp.sensors.Cond = temp.sensors.Cond*0;
      temp.sensors.DOpct = temp.sensors.DOpct* DOw;
      temp.sensors.Sal = temp.sensors.Sal*SALw;
      temp.sensors.Temp = temp.sensors.Temp*TEMPw;
      temp.sensors.Turb = temp.sensors.Turb*TURw;
      temp.sensors.pH =  temp.sensors.pH*pHw;

      temp.wqi = temp.sensors.Cond+ temp.sensors.DOpct+temp.sensors.Sal+temp.sensors.Temp+temp.sensors.Turb + temp.sensors.pH;

      wqi.push(temp);
      
    }
    // maybe use map function 
    let total_sum = 0;
    for (let i of wqi) {
      total_sum+=i.wqi;
    }
    //console.log(average(wqi));
    // console.log(wqi[0])
    // let average = wqi.reduce((a, b) => a.wqi + b.wqi);

    console.log(total_sum/wqi.length)


    // console.log(data);
    fs.writeFile(`myfile${sourceA}.json`, JSON.stringify(wqi,null," "), (err) => {
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

// (async () => {
//   try {                        
//    const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceB}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
//     if (!response.ok) {
//       const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
//       error.response = response;
//       throw error;
//     }
//     const data = await response.json();
//     // console.log(data);
//     fs.writeFile(`data/myfile${sourceB}.json`, JSON.stringify(data,null," "), (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('File saved successfully!');
//         }
//       });
    
//   }


//   catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// })();
