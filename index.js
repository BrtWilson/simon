const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.static('public'));  
    // : Install the middleware to = 
    //      look in public in response to any request that might be a file




// Return to default page if path is unknown: (by keeping as last request use)
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});