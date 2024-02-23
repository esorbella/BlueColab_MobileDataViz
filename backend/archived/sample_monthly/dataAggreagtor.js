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
            jsonData.map( (month) =>  {
                
            })

            fs.writeFile(`data/aggregatedAlanSourceData.json`, JSON.stringify(jsonData,null," "), (err) => {
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