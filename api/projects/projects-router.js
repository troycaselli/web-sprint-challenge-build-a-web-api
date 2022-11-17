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

router.post('/', validateProjectInfo, (req, res, next) => {
    try {
        res.status(201).json(req.newProject);
    } catch(err) {
        next(err);
    }
})

// router.put('/:id', async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err);
//     }
// })

module.exports = router;
