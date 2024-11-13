const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const results = await mongodb.getDB().collection('users').find();
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getOne = async (req, res) => {
    //#swagger.tags = ['Users']

    const userId = req.params.id;
    try {
        const result = await mongodb.getDB().collection('users').findOne({ _id: new ObjectId(userId) });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favColour: req.body.favColour,
        birthday: req.body.birthday,
    };
    const results = await mongodb.getDB().collection('users').insertOne(newUser);
    if (results.acknowledged) {
        res.status(200).send;
    } else {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']

    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favColour: req.body.favColour,
        birthday: req.body.birthday,
    };
    const results = await mongodb.getDB().collection('users').updateOne({ _id: userId }, { $set: updatedUser });
    if (results.modifiedCount > 0) {
        res.status(200).send;
    } else {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']

    const userId = new ObjectId(req.params.id);
    const results = await mongodb.getDB().collection('users').deleteOne({ _id: userId });
    if (results.deletedCount > 0) {
        res.status(200).send;
    } else {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

module.exports = { getAll, getOne, createUser, updateUser, deleteUser };