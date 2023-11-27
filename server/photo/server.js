'use strict';

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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    // Use a unique filename, or use the original filename
    cb(null, 'a-' + file.originalname);
  }
});

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

    // Your existing code for sending data to another server
    const result = await sendToAnotherServer(fileDetails);

    console.log('done')

    if (result.data == "Not Found") {
      res.json({ message: 'Species not found', result });
      return;
    }

    const promises = result.data.results.map(async (item) => {
      try {
        const result1 = await test1(item.gbif.id);
        item.imgs = result1;
      } catch (error) {
        console.error(`Error for ${item.species.scientificNameWithoutAuthor}: ${error.message}`);
      }
    });

    await Promise.all(promises);

    console.log("Loop done")


    const file_path = './USRIISv2_MasterList.csv';
    fs.createReadStream(file_path)
      .pipe(csv())
      .on('data', (row) => {
        // Assuming the name is in the 'name' column, adjust the key if it's in a different column
        const currentName = row.scientificName;
        for (let specie of result.data.results) {
          let scientificNameWithoutAuthor = specie.species.scientificNameWithoutAuthor;
          if (scientificNameWithoutAuthor == currentName) {
            console.log("Ahhh")
            // if (specie.invasive) {
            specie.invasive = true;

          } else if (specie.invasive == true) {
            // edge case 
          } else {
            specie.invasive = false;
          }

        }
      })
      .on('end', () => {
        console.log('Finished reading the CSV file.');
        //        console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below]
        res.json({ message: 'Image received, saved, and processed successfully!!!', result });
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

// Your existing code for sending data to another server
async function sendToAnotherServer(fileDetails) {
  let form = new FormData();
  form.append('organs', 'auto');
  form.append('images', fs.createReadStream(fileDetails.path));

  const project = 'all';

  try {
    const { status, data } = await axios.post(
      'https://my-api.plantnet.org/v2/identify/' + project + '?api-key=2b10RIKodP0IQc4eGgBJFaABO',
      form, {
      headers: form.getHeaders()
    });

    console.log('status', status);
 //   console.log('data', require('util').inspect(data, false, null, true));

    return { status, data };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle 404 error from the external server
      console.error('External server returned a 404 error:', error.response.data);
      // You can choose to respond to the client with a specific message or take other actions
      return { status: 404, data: 'Not Found' };
    }
    console.error('error', error);
    throw error;
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


async function test1(id) {
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

// async function test(species) {

//   const apiUrl = 'https://api.gbif.org/v1/species/match';
//   const speciesName = species;;
//   const verbose = true;

//   const params = {
//     species: speciesName,
//     verbose: verbose.toString(),
//   };

//   axios.get(apiUrl, { params })
//     .then(response => {
//       const apiUrl = `https://api.gbif.org/v1/species/${response.data.usageKey}/media`;
//       axios.get(apiUrl)
//         .then(response => {
//           const listOfNames = response.data.results.map(obj => obj.identifier);
//           console.log(listOfNames)
//           return listOfNames;
//         })
//         .catch(error => {
//           console.error(`Error: ${error.message}`);
//         });
//     })
//     .catch(error => {
//       console.error(`Error: ${error.message}`);
//     });
// }