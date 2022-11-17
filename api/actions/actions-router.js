// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {
    validateId,
    validateActionInfo
} = require('./actions-middleware');

const router = express();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})

router.get('/:id', validateId, (req, res, next) => {
    try {
        res.status(200).json(req.action);
    } catch(err) {
        next(err);
    }
})

router.post('/', validateActionInfo, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch(err) {
        next(err);
    }
})

router.put('/:id', validateId, validateActionInfo, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        res.status(200).json(updatedAction);
    } catch(err) {
        next(err);
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.status(200).json({message: 'item deleted'});
    } catch(err) {
        next(err);
    }
})

module.exports = router;