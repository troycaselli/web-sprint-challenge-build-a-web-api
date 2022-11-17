// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateId(req, res, next) {
    const project = await Projects.get(req.params.id);
    if(!project) {
        next({status: 404, message: 'project not found'})
    } else {
        req.project = project;
        next();
    }
}

async function validateProjectInfo(req, res, next) {
    const {name, description} = req.body;
        if(!name || !description) {
            next({status: 400, message: 'name and description required'});
        } else {
            const newProject = await Projects.insert(req.body);
            req.newProject = newProject;
            next();
        }
}

module.exports = {
    validateId,
    validateProjectInfo
}