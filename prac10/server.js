const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const LOGS_DIR = path.join(__dirname, 'logs');

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensure logs directory exists
const ensureLogsDir = async () => {
  try {
    // Create logs directory if it doesn't exist
    await fs.mkdir(LOGS_DIR, { recursive: true });
    console.log(`Logs directory: ${LOGS_DIR}`);
    
    // Create a sample log file if it doesn't exist
    const sampleLogPath = path.join(LOGS_DIR, 'error.log');
    try {
      await fs.access(sampleLogPath);
      console.log('Sample log file already exists');
    } catch {
      const sampleLog = `[${new Date().toISOString()}] INFO: Application started\n` +
        `[${new Date().toISOString()}] ERROR: Sample error message\n` +
        `[${new Date().toISOString()}] DEBUG: Debug information\n`;
      await fs.writeFile(sampleLogPath, sampleLog);
      console.log('Created sample log file');
    }
  } catch (err) {
    console.error('Error setting up logs directory:', err);
    throw err; // Re-throw to prevent the app from starting without logs directory
  }
};

// Routes
app.get('/', async (req, res) => {
  try {
    const files = await fs.readdir(LOGS_DIR);
    const logFiles = files.filter(file => file.endsWith('.log'));
    res.render('index', { 
      logFiles,
      currentFile: null,  
      logContent: []   // Fix: use empty array to avoid null forEach error
    });
  } catch (err) {
    console.error('Error reading logs directory:', err);
    res.status(500).render('error', { 
      message: 'Failed to read logs directory',
      error: err 
    });
  }
});

app.get('/logs/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(LOGS_DIR, filename);
  
  try {
    // Security check: Prevent directory traversal
    if (!filePath.startsWith(LOGS_DIR)) {
      return res.status(403).render('error', { 
        message: 'Access denied',
        error: { status: 403 }
      });
    }
    
    const content = await fs.readFile(filePath, 'utf8');
    const files = await fs.readdir(LOGS_DIR);
    const logFiles = files.filter(file => file.endsWith('.log'));
    
    res.render('index', { 
      logFiles,
      currentFile: filename,
      logContent: content.split('\n')
    });
  } catch (err) {
    console.error(`Error reading log file ${filename}:`, err);
    res.status(404).render('error', { 
      message: 'Log file not found or cannot be read',
      error: err 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    error: err 
  });
});

// Start server
const startServer = async () => {
  await ensureLogsDir();
  
  app.listen(PORT, () => {
    console.log(`Log viewer running on http://localhost:${PORT}`);
    console.log(`Logs directory: ${LOGS_DIR}`);
  });
};

startServer().catch(console.error);
