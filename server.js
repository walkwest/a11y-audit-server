const express = require('express');
const server = express();
const port = 3000;

// Define routes
const accessibility = require('./routes/accessibility');

/**
 * Register routes
 */
server.use('/accessibility', accessibility);

/**
 * Listen for connections 
 */
server.listen(port, () => {
  console.log(`Server up and listening at http://localhost:${port}`)
});
