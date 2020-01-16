const db = require('./data/db');
const express = require('express');

const server = express();

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({sucess: false, err});
        });
});
