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
            res.status(500).json({success: false, errorMassage: 'The users information could not be retrieved'});
        });
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for user.'})
    }

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
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }            
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage:'The user information could not be retrieved'});
        });
});

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    

    db.remove(id)
        .then(deleteUser => {
            if (deleteUser) {
                res.status(204).end();
            } else {
                res.status(404).json({messsage: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({success:false, errorMessage:'The user could not be removed'});
        });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;    
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for user.'})
    }

    db.update(id, userInfo)

        .then(user => {
            if(user) {
                res.status(200).json({success: true, user});
            } else {
                res.status(404).json({message:'The user with the specified ID does not exist'}) 
            }
            
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        });
});