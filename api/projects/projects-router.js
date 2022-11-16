// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
})

router.get('/:id', async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        if(!project) {
            next({status: 404, message: 'project not found'})
        } else {
            res.status(200).json(project);
        }
    } catch(err) {
        next(err);
    }
})

module.exports = router;
