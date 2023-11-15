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
    const headers = lines[32].split(',');
    const result = [];

    for (let i = 33; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

// Example usage
const tsvFilePath = 'downloaded1.rdb';
const csvFilePath = 'converted_data.csv';
const jsonFilePath = 'converted_data.json';

// Parse TSV
const parsedData = parseTSVFile(tsvFilePath);

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