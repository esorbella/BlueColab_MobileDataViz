const fs = require('fs');

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://es30402p:dTjK61rpdMBaiUvx@colab.h6ohwn0.mongodb.net/Sample';

// JSON file path
const jsonFilePath = 'C:\\Users\\toots\\OneDrive\\Desktop\\WorknSchool\\CS389\\BlueColab_MobileDataViz\\server\\sample_monthly\\data\\wqiAlanSourceData.json';
console.log(jsonFilePath);
async function importData() {
  try {
    // Create a MongoDB client
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db();
    const collection = db.collection('Choate');

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Insert the JSON data into the MongoDB collection
    const result = await collection.insertOne(jsonData);

    console.log(`Imported ${result.insertedCount} documents into MongoDB`);

    // Close the MongoDB client
    await client.close();
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();

