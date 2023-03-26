const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+src://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('simon').collection('score');

function addScore(score) {
    scoreCollection.insertOne(score);
}

function getHighScores() {
    const query = {score: {$gt: 0}};
    const options = {
        sort: {score: -1},
        limit: 15,
    };
    const cursor = scoreCollection.fing(query, options);
    return cursor.toArray();
}

module.exports = {addScore, getHighScores};