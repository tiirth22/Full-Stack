// Import required modules
const express = require('express');
const multer = require('multer');
const path = require('path');

// Create an Express application
const app = express();
const port = 3001;

// Set up the view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Set up Multer with storage, file filter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
}).single('resume');

// Route to display the main upload form
app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

// Route to handle the file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle Multer errors (e.g., file size, file type)
      if (err instanceof multer.MulterError) {
        return res.render('index', { message: null, error: `File upload error: ${err.message}` });
      }
      // Handle custom errors (e.g., file type)
      return res.render('index', { message: null, error: err.message });
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.render('index', { message: null, error: 'Please select a file to upload.' });
    }

    // If upload is successful, render the success message
    res.render('index', { message: `File '${req.file.originalname}' uploaded successfully!`, error: null });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
