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
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve your React Native app (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle image uploads
app.post('/upload', upload.single('photo'), (req, res) => {
  try {
    // Access the uploaded file from req.file.buffer
    const imageBuffer = req.file.buffer;

    // Save the image to the 'uploads/' directory
    // The filename will be unique due to the timestamp added in the storage configuration
    const imagePath = path.join(__dirname, 'uploads', req.file.filename);
    require('fs').writeFileSync(imagePath, imageBuffer);

    // Provide a link or path to download the saved image
   // const downloadLink = `/download/${req.file.filename}`;
   // res.json({ message: 'Image received and saved successfully!', downloadLink });
  } catch (error) {
    // Handle errors
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve saved images for download
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
