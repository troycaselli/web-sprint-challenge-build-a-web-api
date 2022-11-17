// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {
    validateId,
    validateProjectInfo
} = require('./projects-middleware');

const router = express();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
})

router.get('/:id', validateId, (req, res, next) => {
    try {
        res.status(200).json(req.project);
    } catch(err) {
        next(err);
    }
})

router.post('/', validateProjectInfo, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
})

router.put('/:id', validateId, validateProjectInfo, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
    } catch(err) {
        next(err);
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        // const deletedProject = await Projects.get(id);
        await Projects.remove(req.params.id);
        res.status(200).json({message: 'item deleted'});
    } catch(err) {
        next(err);
    }
})

module.exports = router;
