// 'use strict';

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const multer = require('multer');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const port = 3000;

// Set up a storage engine for multer
const storage = multer.memoryStorage(); // Use memory storage to handle file uploads directly in memory

const upload = multer({ storage: storage });

// Serve your React Native app (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle image uploads and send data to another server
app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    // Access the uploaded file details from req.file
    const fileDetails = req.file;

    // Log the contents of req.file
    console.log('req.file:', fileDetails);

    if (!fileDetails) {
      throw new Error('No image data received.');
    }

    // Getting Plant identification 
    const result = await getPlantID(fileDetails);

    console.log('done')

    // handle cases where no valid plant was found
    if (result.data == "Not Found") {
      res.json({ message: 'Species not found', result });
      return;
    }

    // attaches links to images of the plants
    const promises = result.data.results.map(async (item) => {
      try {
        const result1 = await getImages(item.gbif.id);
        item.imgs = result1;
      } catch (error) {
        console.error(`Error for ${item.species.scientificNameWithoutAuthor}: ${error.message}`);
      }
    });

    await Promise.all(promises);

    console.log("Loop done")

    // attaches if plant species is invasive or not
    const file_path = './USRIISv2_MasterList.csv';
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', (row) => {
        // goes row by row and sees if any plants are invasive 
        const currentName = row.scientificName;
        for (let specie of result.data.results) {
          let scientificNameWithoutAuthor = specie.species.scientificNameWithoutAuthor;
          if (scientificNameWithoutAuthor == currentName) {
            specie.invasive = true;

          } else if (specie.invasive == true) {
            // edge case 
          } else {
            specie.invasive = false;
          }

        }
      })
      .on('end', () => {
        // Successful request
        console.log('Finished reading the CSV file.');
        res.json({ message: 'Image received and processed successfully!!!', result });
        console.log(result.data.results)

      })
      .on('error', (error) => {
        console.error(`An error occurred: ${error}`);
      });

  } catch (error) {
    // Handle errors
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Code to get plant ids
async function getPlantID(fileDetails) {
  const form = new FormData();
  form.append('organs', 'auto');
  form.append('images', fileDetails.buffer, {
    filename: fileDetails.originalname,
    contentType: fileDetails.mimetype
  });

  const project = 'all'; // see api docs: https://my-api.plantnet.org/

  try {
    const { status, data } = await axios.post(
      'https://my-api.plantnet.org/v2/identify/' + project + '?api-key=2b10RIKodP0IQc4eGgBJFaABO',
      form, {
      headers: form.getHeaders()
    });

    console.log('status', status);

    return { status, data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 404 error from the external server
      console.error('External server returned a 404 error:', error.response.data);
      return { status: 404, data: 'Not Found' };
    }
    console.error('error', error);
    throw error;
  }
}

// gets images of plants
async function getImages(id) {
  try {
    const apiUrl = `https://api.gbif.org/v1/species/${id}/media`;
    const response = await axios.get(apiUrl);

    const listOfNames = response.data.results.map(obj => obj.identifier);

    return listOfNames;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get("/", async function (req, res) {
  try {
    res.status(200).send(`Wassup`);
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});
