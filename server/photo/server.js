'use strict';

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    // Use a unique filename, or use the original filename
    cb(null, '-' + file.originalname);
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

    res.json({ message: 'Image received, saved, and processed successfully!!!', result });
  } catch (error) {
    // Handle errors
    if (error.response.data.statusCode == 404) {
      console.log("404 Error",error.response.data.message);
      res.json({ message: error.response.data.message });
      return;
    }
      
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
    console.log('data', require('util').inspect(data, false, null, true));

    return { status, data };
  } catch (error) {
 //   console.error('error', error);
    throw error;
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
