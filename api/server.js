const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('*', (req, res) => {
    res.send('Hey there!');
})

server.use((error, req, res, next) => { // eslint-disable-line
    console.log(error.status);
    res.status(error.status || 500).json({message: error.message})
})

module.exports = server;
