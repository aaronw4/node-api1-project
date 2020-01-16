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
            res.status(500).json({success: false, err});
        });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then((user) => {
            res.status(201).json({success: true, user});
        })
        .catch((err) => {
            res.status(500).json({success: false, err});
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        });
});
