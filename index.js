import express from "express";
import logLevels from './middleware/logLevels.js';
import requestLogger from './middleware/requestLogger.js';



const app = express();
const PORT = process.env.PORT || 3000;

// Use request logging middleware
app.use(requestLogger);
app.use(logLevels('info'));  // Use 'debug' for more detailed logging

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});