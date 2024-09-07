import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Calculate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the logs directory exists
const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const logFilePath = path.join(logsDirectory, 'app.log');

const logLevels = (level) => {
    return (req, res, next) => {
        const now = new Date();
        const timestamp = now.toISOString();
        const method = req.method;
        const url = req.originalUrl || req.url;
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const protocol = req.protocol.toUpperCase();  // 'http' or 'https'

        const logMessage = `[${timestamp}] - ${protocol} - ${method} - ${url} - ${ipAddress} \n `;

        if (level === 'info') {
            fs.appendFile(logFilePath, `INFO: ${logMessage}`, (err) => {
                if (err) throw err;
            });
        } else if (level === 'debug') {
            fs.appendFile(logFilePath, `DEBUG: ${logMessage}`, (err) => {
                if (err) throw err;
            });
        }

        next();
    };
};

export default logLevels;
