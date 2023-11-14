const fetch = require('node-fetch');
const fs = require('fs');
const redisParser = require('redis-parser');

const url = 'https://nwis.waterservices.usgs.gov/nwis/iv/?sites=01376307&startDT=2023-02-01&endDT=2023-06-30&format=rdb';
const outputFile = 'downloaded1.rdb';
const outputJsonFile = 'output.json';

const downloadFile = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fileStream = fs.createWriteStream(outputFile);
        await new Promise((resolve, reject) => {
            response.body.pipe(fileStream);
            response.body.on('error', (err) => {
                reject(err);
            });
            fileStream.on('finish', function () {
                resolve();
            });
        });

        console.log('Download complete. File saved as', outputFile);

        // Read the downloaded RDB file
        const rdbData = fs.readFileSync(outputFile);

        // Convert RDB data to JSON
        const jsonData = redisParser.parse(rdbData);

        // Save the JSON data to a file
        fs.writeFileSync(outputJsonFile, JSON.stringify(jsonData, null, 2));

        console.log('Conversion completed. JSON data saved to', outputJsonFile);
    } catch (error) {
        console.error('Error downloading or converting file:', error.message);
    }
};

downloadFile();