const fetch = require("node-fetch");
const fs = require('fs');

wqiData('data/aggregatedAlanSourceData.json');

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
            // just for choate pond
            const DOw = 0.34;
            const pHw = 0.22;
            const TEMPw = 0.2;
            const COw = 0.08;
            const TURw = 0.16;

            jsonData.map((month) => {
                let monthlyWQISum = 0;
                month.data.map((measurement) => {
                    let obj = {};
                    obj.DOpct = measurement.sensors.DOpct * DOw;
                    obj.Cond = measurement.sensors.Cond * COw;
                    obj.Temp = measurement.sensors.Temp * TEMPw;
                    obj.Turb = measurement.sensors.Turb * TURw;
                    obj.pH = measurement.sensors.pH * pHw;
                    // console.log(obj);
                    obj.wqi = obj.DOpct + obj.Cond + obj.Temp + obj.Turb + obj.pH;
                    monthlyWQISum += obj.wqi;
                    measurement.wqi = obj;
                })
                month.wqi = monthlyWQISum / month.data.length;
                console.log(month.data[0],monthlyWQISum / month.data.length);
            })

            fs.writeFile(`data/wqiAlanSourceData.json`, JSON.stringify(jsonData, null, " "), (err) => {
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