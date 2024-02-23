const fetch = require("node-fetch");
const fs = require('fs');

// goal: "convert units, rename columns"
cleanData("data/raw01376307SourceData.json")

async function cleanData(filePath) {

    // Specify the path to the JSON file
    //const filePath = 'data/rawAlanSourceData.json';

    // Reading the content from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            let months = JSON.parse(data);
           // for (let month of months) {
            
            months.map( (month) =>  {
                month.data.value.timeSeries.map( (measurement) => {
                    console.log(measurement);

                    let xyz = 4/0;dfadsfsfasf

                    // month.data.map((measurement) => {
                    //     console.log(measurement)
                    //     // convert temperate
                    //    // measurement.sensors.TempF = convertToFahrenheit(measurement.sensors.Temp);
                    // })
                })
               
                
            })

            //writes it to file
            fs.writeFile(`data/cleaned01376307SourceData.json`, JSON.stringify(months, null, " "), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File saved successfully (called in dataRetrieval.js)!');
                }
            });

        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return;
        }


    });



}

function convertToFahrenheit(celsius) {
    return celsius * (9 / 5) + 32;

}