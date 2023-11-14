require('dotenv').config();

const axios = require('axios');
const mongoose = require('mongoose');

// Set up MongoDB connection
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGO_DB, mongooseOptions);
const db = mongoose.connection;

// Define a mongoose schema for your data
const sensorDataSchema = new mongoose.Schema({
  Cond: Number,
  DOpct: Number,
  Sal: Number,
  Temp: Number,
  Turb: Number,
  pH: Number,
  timestamp: String,
  MonthYear: String
});

const SensorData = mongoose.model('ChoateWaterDoc', sensorDataSchema);

const currentYear = new Date().getFullYear().toString();
var month = new Date().getMonth() + 1;
var currentMonth = month.toString().padStart(2, '0');

async function fetchDataAndSaveToMongo(startDate, stopDate) {
  try {
    const apiUrl = `https://colabprod01.pace.edu/api/influx/sensordata/Alan/range?stream=false&start_date=${startDate}&stop_date=${stopDate}`;
    const response = await axios.get(apiUrl);
    const sensorDataArray = await response.data;


    // Save data to MongoDB
    await SensorData.insertMany(sensorDataArray.map(item => ({
      timestamp: item.timestamp,
      Cond: item.sensors.Cond,
      DOpct: item.sensors.DOpct,
      Sal: item.sensors.Sal,
      Temp: item.sensors.Temp,
      Turb: item.sensors.Turb,
      pH: item.sensors.pH,
      MonthYear: '01-' + currentYear 
    })));

    console.log(`Data for ${startDate} to ${stopDate} saved to MongoDB.`);
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
  }
}

/*for(let month = 1; month < 13; month++){
    var dayCount = 0;
    if (month == 2)
    {
        dayCount = 28;
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11)
    {
        dayCount = 30;
    }
    else 
    {
        dayCount = 31;
    }*/
    for (let day = 1; day < 32; day++) {
        const startDate = `${currentYear}-01-${day.toString().padStart(2, '0')}T00%3A00%3A00%2B00%3A00`;
        const stopDate = `${currentYear}-01-${(day + 1).toString().padStart(2, '0')}T00%3A00%3A00%2B00%3A00`;
    
        fetchDataAndSaveToMongo(startDate, stopDate);
    }
//}

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to script termination.');
    process.exit();
  });
});
