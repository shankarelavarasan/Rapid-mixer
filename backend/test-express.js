const express = require('express');
const app = express();
const port = 3002; // Using a different port to avoid conflicts

app.listen(port, () => {
    console.log(`Test Express server listening at http://localhost:${port}`);
});

console.log('Test Express script end');