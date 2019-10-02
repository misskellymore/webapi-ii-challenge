const express = require('express');

// To create a router, express.Router
const router = express.Router();


router.get('/', (req, res) => {
    res.send('working');
});


// To export this file
module.exports = router;

