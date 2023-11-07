const express = require("express");
const fetch = require("node-fetch");
const fs = require('fs');

// update these parameters to change days
let monthlyData = [
  {
    year:"2022",
    month:"12",
    end:"31"
  },
  {
    year:"2023",
    month:"01",
    end:"31"
  },
  {
    year:"2023",
    month:"02",
    end:"28"
  },
  {
    year:"2023",
    month:"03",
    end:"31"
  },
  {
    year:"2023",
    month:"04",
    end:"30"
  },
  {
    year:"2023",
    month:"05",
    end:"31"
  },
  {
    year:"2023",
    month:"06",
    end:"30"
  },
  {
    year:"2023",
    month:"07",
    end:"31"
  },
  {
    year:"2023",
    month:"08",
    end:"31"
  },
  {
    year:"2023",
    month:"09",
    end:"30"
  },
  {
    year:"2023",
    month:"10",
    end:"31"
  }
]

let DATA = [];


  // console.log(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceA}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
  (async () => {

    for (let month of monthlyData) {

  let startYear = month.year;
  let startMonth = month.month;
  let startDay = "01";
  let startHour = "00"; // hours are in GMT, so four/five hours ahead of us
  let startMinute = "00";
  let startSecond = "00";
  
  let endYear = month.year;
  let endMonth = month.month;
  let endDay = month.end;
  let endHour = "23";
  let endMinute = "59";
  let endSecond = "59";
  
  let sourceA = "Alan";
  let utcOffsetHour = "00";
  let utcOffsetMinute = "00";

    try {                        
     const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceA}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
      if (!response.ok) {
        const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
      }
      const data = await response.json();
  
      DATA.push(data);
      
      // console.log(data);
      fs.writeFile(`myfile${sourceA}.json`, JSON.stringify(DATA,null," "), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File saved successfully!');
          }
        });
      console.log(DATA)
    }
    
  
    catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  })();


  


// (async () => {
//   try {                        
//    const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${sourceA}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
//     if (!response.ok) {
//       const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
//       error.response = response;
//       throw error;
//     }
//     const data = await response.json();

//     DATA.push(data);
    
//     // console.log(data);
//     fs.writeFile(`myfile${sourceA}.json`, JSON.stringify(DATA,null," "), (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('File saved successfully!');
//         }
//       });
//     console.log(DATA)
//   }
  

//   catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// })();
// console.log(DATA)

// let wqi = [];

//     DOw = 0.34
//       pHw = 0.22
//       TEMPw = 0.2
//       SALw = 0.08
//       TURw = 0.16
//    //   console.log(data[0]);
//     for (let measurment of data) {
//       let temp = measurment;
//       temp.sensors.Cond = temp.sensors.Cond*0;
//       temp.sensors.DOpct = temp.sensors.DOpct* DOw;
//       temp.sensors.Sal = temp.sensors.Sal*SALw;
//       temp.sensors.Temp = temp.sensors.Temp*TEMPw;
//       temp.sensors.Turb = temp.sensors.Turb*TURw;
//       temp.sensors.pH =  temp.sensors.pH*pHw;

//       temp.wqi = temp.sensors.Cond+ temp.sensors.DOpct+temp.sensors.Sal+temp.sensors.Temp+temp.sensors.Turb + temp.sensors.pH;

//       wqi.push(temp);
      
//     }
//     // maybe use map function 
//     let total_sum = 0;
//     for (let i of wqi) {
//       total_sum+=i.wqi;
//     }


//  console.log(startMonth,startYear,total_sum/wqi.length)
