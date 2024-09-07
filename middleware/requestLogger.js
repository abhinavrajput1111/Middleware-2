
// const morgan = require('morgan');

import morgan from "morgan";

// Create a request logger middleware function
const requestLogger = morgan('combined', {
    stream: {
        write: (message) => {
            console.log(message.trim());
        },
    },
});

export default requestLogger;