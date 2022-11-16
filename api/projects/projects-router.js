// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express();

router.get('/', async (req, res, next) => {
    const projects = await Projects.get();
    Projects.get()
        .then(() => {
            res.status(200).json(projects);
        })
        .catch(next);
})

module.exports = router;
