const fetch = require('node-fetch');
const fs = require('fs');

siteID = "01376307"; // default

if (process.argv.length > 2) {
    siteID = process.argv[2];
}

// Function to parse a tab-separated file
function parseRDBFile(filePath) {
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
    let headerLine = 0;

    // detecting the header line
    while (!lines[headerLine].includes("agency_cd")) {
        // console.log(lines[headerLine])
        headerLine++;
    }
    let headers = lines[headerLine].split(',');
    const result = [];

    // fixing labels
    for (let headIndex = 0; headIndex < headers.length; headIndex++) {
       // console.log(headers[headIndex]);
        if (headers[headIndex].includes("00010"))
            headers[headIndex] = "Temp";
        if (headers[headIndex].includes("00095"))
            headers[headIndex] = "Cond";
        if (headers[headIndex].includes("00300"))
            headers[headIndex] = "DOmpl";
        if (headers[headIndex].includes("00301"))
            headers[headIndex] = "DOpct";
        if (headers[headIndex].includes("00400"))
            headers[headIndex] = "pH";
        if (headers[headIndex].includes("63680"))
            headers[headIndex] = "Turb";
        if (headers[headIndex].includes("90860"))
            headers[headIndex] = "Sal";
    }

    for (let i = headerLine + 2; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < 4; j++) {
            obj[headers[j]] = currentLine[j];
        }

        const sensors = {}

        for (let j = 4; j < headers.length; j += 2) {
            sensors[headers[j]] = currentLine[j];
        }
        obj.sensors = sensors;
        result.push(obj);
    }
    return result;
}

// Download and process the file
const downloadAndProcess = async () => {
    const url = `https://nwis.waterservices.usgs.gov/nwis/iv/?sites=${siteID}&startDT=2023-01-01&endDT=2023-12-31&format=rdb`;
    const outputFile = `data/downloaded${siteID}.rdb`;
    const csvFilePath = `data/converted_data${siteID}.csv`;
    const jsonFilePath = `data/converted_data${siteID}.json`;

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

        // Parse RDB
        const parsedData = parseRDBFile(outputFile);

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
