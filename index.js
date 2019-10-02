// imports

const express = require('express');
const postRouter = require('./Routes/postRouter.js');


// End of Imports

const server = express();
server.use(express.json());
// line 10 is "middleware"

server.use('/api/post', postRouter);
// First argument is the route you want to prepend all of routes inside of postRouter


server.listen(3333, () => console.log('server on 3333'));