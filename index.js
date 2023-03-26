const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json()); // parses json object to javascript object (e.g. req.body)

app.use(express.static('public'));  
    // : Install the middleware to = 
    //      look in public in response to any request that might be a file


// Consider the main objects in your application. What objects do you need to retrieve? 
//    (Usually create-user and login-user) -> something to get and something to update/upload
//      These will determine what endpoints you need.
// : 
//  Router:
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
    const scores = await DB.getHighScores();
    res.send(scores);
    //res.send(getScores());
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
    DB.addScore(req.body);
    const scores_ = await DB.getHighScores();
    //let scores_ = updateScores(req.body);
    res.send(scores_);
});



// Return to default page if path is unknown: (by keeping as last request use)
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// API Retrieval Stand-in Functions
// function getScores() {
//     return defaultScores;
// }
// scores = [
//     {
//         "score": 27,
//         "date": "Oct 20, 2019",
//         "name": "Ash Ketchum"
//     },
//     {
//         "score": 19,
//         "date": "Aug 2, 2001",
//         "name": "Ash Ketchum"
//     },
//     {
//         "score": 13,
//         "date": "July 4, 2020",
//         "name": "Capt. Slade"
//     }
// ]

// function updateScores(newScore) {
//     let scores = getScores();
//     let found = false;
//     for (const [i, prevScore] of scores.entries()) {
//         if (newScore.score > prevScore.score) {
//             scores.splice(i, 0, newScore);
//             found = true;
//             break;
//         }
//     }

//     if (!found) {
//         scores.push(newScore);
//     }

//     if (scores.length > 15) {
//         scores.length = 15; // truncates array at size 10
//     }
//     return scores;
// }