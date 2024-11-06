const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const results = await mongodb.getDB().collection('users').find();
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getOne = async (req, res) => {
    const userId = req.params.id;
    const results = await mongodb.getDB().collection('users').findOne({ _id: ObjectId(userId) });
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

module.exports = { getAll, getOne };