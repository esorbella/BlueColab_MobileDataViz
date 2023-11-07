const fetch = require("node-fetch");
const fs = require('fs');

wqiData('data/cleanedAlanSourceData.json');

async function wqiData(filePath) {
    // Specify the path to the JSON file
    //const filePath = 'data/cleanedAlanSourceData.json';

    // Reading the content from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            let jsonData = JSON.parse(data);
            // let wqi_month = [];

            // just for choate pond
            let DOw = 0.34;
            let pHw = 0.22;
            let TEMPw = 0.2;
            let SALw = 0.08;
            let TURw = 0.16;

            months.map( (month) =>  {
                month.map((measurement) => {
                   let obj = {};
                   obj.DOpct = temp.sensors.DOpct * DOw;
                   obj.Sal = temp.sensors.Sal * SALw;
                   obj.Temp = temp.sensors.Temp * TEMPw;
                   obj.Turb = temp.sensors.Turb * TURw;
                   obj.pH = temp.sensors.pH * pHw;
                   obj.wqi = obj.Cond + temp.sensors.DOpct + temp.sensors.Sal + temp.sensors.Temp + temp.sensors.Turb + temp.sensors.pH;
                   measurement.wqi = obj;
                })
            })


            for (month of jsonData) {
                let wqi = [];
                //   console.log(data[0]);
                for (let measurement of month) {
                    let temp = measurement;
                    temp.sensors.Cond = temp.sensors.Cond * 0;
                    temp.sensors.DOpct = temp.sensors.DOpct * DOw;
                    temp.sensors.Sal = temp.sensors.Sal * SALw;
                    temp.sensors.Temp = temp.sensors.Temp * TEMPw;
                    temp.sensors.Turb = temp.sensors.Turb * TURw;
                    temp.sensors.pH = temp.sensors.pH * pHw;

                    temp.wqi = temp.sensors.Cond + temp.sensors.DOpct + temp.sensors.Sal + temp.sensors.Temp + temp.sensors.Turb + temp.sensors.pH;

                    wqi.push(temp);

                }

                wqi_month.push(wqi);
                // maybe use map function 
                let total_sum = 0;
                for (let i of wqi) {
                    total_sum += i.wqi;
                }

               

//                console.log(month[0].timestamp.substring(0,7),total_sum / wqi.length)

            }

            fs.writeFile(`data/wqiAlanSourceData.json`, JSON.stringify(wqi_month,null," "), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('File saved successfully!');
                }
            });

        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    });

}