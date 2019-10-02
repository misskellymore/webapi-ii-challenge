const express = require('express');
const db = require('../data/db.js');

// To create a router, express.Router
const router = express.Router();


router.get('/', (req, res) => {
    // find() returns a promise that resolves to an array of all 
    // the posts contained in the database.
    db.find()
    .then(post => res.status(200).json(post))
    .catch(err => {
        console.log(err);
        res.status(500).json({err: 'cannot get post info'});
    });
    
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    // this method expects an id as it's only parameter and returns the
    // post corresponding to the id provided or an empty array if no post 
    // with that id is found
    .then(post => {
        console.log(post);
        res.status(200).json(post);
        
    });

});


// To export this file
module.exports = router;

