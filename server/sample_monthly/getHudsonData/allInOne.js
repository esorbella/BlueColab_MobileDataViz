const fetch = require('node-fetch');
const fs = require('fs');

// Function to parse a tab-separated file
function parseTSVFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const rows = fileContent.split('\n');
    const data = rows.map(row => row.split('\t'));
    return data;
}

// Function to convert parsed data to CSV
function convertToCSV(parsedData) {
    return parsedData.map(row => row.join(',')).join('\n');
}

// Function to save data to a file
function saveToFile(data, filePath) {
    fs.writeFileSync(filePath, data);
}

// Function to convert CSV to JSON
function convertCSVtoJSON(csvData) {
    const lines = csvData.split('\n');
    let headers = lines[33].split(',');
    const result = [];

    headers[2] = "timestamp";
    headers[4] = "Temp";
    headers[6] = "Cond";
    headers[8] = "DOmpl"
    headers[10] = "DOpct"
    headers[12] = "pH"
    headers[14] = "Turb"
    headers[16] = "Sal"

    for (let i = 34; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < 4; j++) {
            obj[headers[j]] = currentLine[j];
        }

        const sensors = {}
        
        for (let j = 4; j < headers.length; j+=2) {
            sensors[headers[j]] = currentLine[j];
        }
        obj.sensors = sensors;
        result.push(obj);
    }

    




    return result;
}

// Download and process the file
const downloadAndProcess = async () => {
    const url = 'https://nwis.waterservices.usgs.gov/nwis/iv/?sites=01376307&startDT=2023-01-01&endDT=2023-12-31&format=rdb';
    const outputFile = 'downloaded1.rdb';
    const csvFilePath = 'converted_data.csv';
    const jsonFilePath = 'converted_data.json';

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

        // Parse TSV
        const parsedData = parseTSVFile(outputFile);

        // Convert to CSV
        const csvData = convertToCSV(parsedData);

        // Save CSV to a file
        saveToFile(csvData, csvFilePath);
        console.log(`CSV data saved to ${csvFilePath}`);

        // Convert CSV to JSON
        const jsonData = convertCSVtoJSON(csvData);

        // Save JSON to a file
        saveToFile(JSON.stringify(jsonData, null, 2), jsonFilePath);
        console.log(`JSON data saved to ${jsonFilePath}`);
    } catch (error) {
        console.error('Error downloading or converting file:', error.message);
    }
};

// Example usage
downloadAndProcess();
