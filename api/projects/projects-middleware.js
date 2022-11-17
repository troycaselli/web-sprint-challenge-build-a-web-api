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
    const {name, description, completed} = req.body;
    if(req.method === 'PUT') {
        if(!name || !description || !(completed === false || completed === true)) {
            next({status: 400, message: 'name, description, and completed required'});
        } else {
            next();
        }
    } else {
        if(!name || !description) {
            next({status: 400, message: 'name and description required'});
        } else {
            next();
        }
    }
}

module.exports = {
    validateId,
    validateProjectInfo
}