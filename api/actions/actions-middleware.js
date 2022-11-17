// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateId(req, res, next) {
    const action = await Actions.get(req.params.id);
    if(!action) {
        next({status: 404, message: 'action not found'})
    } else {
        req.action = action;
        next();
    }
}

async function validateActionInfo(req, res, next) {
    const {project_id, description, notes, completed} = req.body;
    if(req.method === 'PUT') {
        if(
            !project_id 
            || !description 
            || !notes 
            || !(completed === false || completed === true)) 
        {
            next({status: 400, message: 'name, description, notes, and completed required'});
        } else {
            next();
        }
    } else {
        if(!project_id || !description || !notes) {
            next({status: 400, message: 'name, description, and notes required'});
        } else {
            next();
        }
    }
}

module.exports = {
    validateId,
    validateActionInfo
}