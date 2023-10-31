const fs = require('fs')
const jsonData = fs.readFileSync('range.json');
let xyz = JSON.parse(jsonData);
const regex = /2023-09-[0-9][0-9]T[0-9][0-9]:(00|15|30|45):00\+00:00/;
let array = xyz.filter(item => regex.test(item.timestamp));
const jsonStringNew = JSON.stringify(array, null, 2);
fs.writeFile('data.json', jsonStringNew , (err) => { if (err) { console.error('Error writing file:', err); } else { console.log('File written successfully'); } });