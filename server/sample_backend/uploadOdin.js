const axios = require('axios');
const mongoose = require('mongoose');

// Set up MongoDB connection
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose.connect('', mongooseOptions);
const db = mongoose.connection;

// Define a mongoose schema for your data
const sensorDataSchema = new mongoose.Schema({
  Rain: Number,
  AirTemp: Number,
  RelHumid: Number,
  WindSpeed: Number,
  BaroPressure: Number,
  VaporPressure: Number,
  timestamp: String
});

const SensorData = mongoose.model('ChoateWeatherDoc', sensorDataSchema);

async function fetchDataAndSaveToMongo(startDate, stopDate) {
  try {
    const apiUrl = `https://api.bluecolab.cc/influx/sensordata/Odin/range?stream=false&start_date=${startDate}&stop_date=${stopDate}`;
    const response = await axios.get(apiUrl);
    const sensorDataArray = await response.data;


    // Save data to MongoDB
    await SensorData.insertMany(sensorDataArray.map(item => ({
      timestamp: item.timestamp,
      Rain: item.sensors.Rain,
      AirTemp: item.sensors.AirTemp,
      RelHumid: item.sensors.RelHumid,
      WindSpeed: item.sensors.WindSpeed,
      BaroPressure: item.sensors.BaroPressure,
      VaporPressure: item.sensors.VaporPressure
    })));

    console.log(`Data for ${startDate} to ${stopDate} saved to MongoDB.`);
  } catch (error) {
    console.error('Error fetching or saving data:', error.message);
  }
}

const currentYear = new Date().getFullYear().toString();
const month = new Date().getMonth().toString();

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
    for (let day = 1; day < 30; day++) {
        const startDate = `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00%3A00%3A00%2B00%3A00`;
        const stopDate = `${currentYear}-${month.toString().padStart(2, '0')}-${(day + 1).toString().padStart(2, '0')}T00%3A00%3A00%2B00%3A00`;
    
        fetchDataAndSaveToMongo(startDate, stopDate);
    }
//}

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to script termination.');
    process.exit();
  });
});
