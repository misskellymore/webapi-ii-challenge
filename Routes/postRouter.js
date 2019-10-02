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


router.post('/', (req, res) => {
    const { title, contents} = req.body;
    if (!title || !contents){
        return res.status(400).json({err: "need title and content"});
    }
    db.insert({title, contents})
    // calling insert passing it a post object will add it to the database 
    // and return an object with the id of the inserted post. The object looks 
    // like this: { id: 123 }
    .then(id => res.status(200).json(id));
});


// To export this file
module.exports = router;

