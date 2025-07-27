import express from "express"; 
 import dotenv from "dotenv"; 
 import path from "path"; 
 import { fileURLToPath } from "url"; 
 import geminiRoutes from './routes/gemini.js'; 
 import cors from "cors";
import fs from 'fs'; 
import { errorHandler, FileProcessingError } from './middleware/errorHandler.js';
  
 dotenv.config(); 
  
 const __filename = fileURLToPath(import.meta.url); 
 const __dirname = path.dirname(__filename); 
  
 const app = express(); 
 const PORT = process.env.PORT || 3000; 
  
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}); 
 app.use(express.json()); 
 app.use(express.urlencoded({ extended: true })); 
  
 // Serve frontend files from the 'docs' directory 
 app.use(express.static('docs'));

/**
 * @route GET /api/templates
 * @description Get a list of available template files.
 * @access Public
 */
app.get('/api/templates', async (req, res, next) => {
    try {
        const templatesDir = path.join(__dirname, 'docs', 'templates');
        const files = await fs.promises.readdir(templatesDir);
        res.json(files);
    } catch (err) {
        next(new FileProcessingError('Error reading templates directory'));
    }
});

// Gemini API routes
app.use('/api', geminiRoutes); 
  
 // Error handling middleware should be the last middleware
app.use(errorHandler);

app.listen(PORT, () => { 
   console.log(`✅ Server running on port ${PORT}`); 
 });
