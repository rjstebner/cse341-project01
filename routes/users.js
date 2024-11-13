const express = require('express');
const router = express.Router();   

const userCon = require('../controllers/users');

router.get('/', userCon.getAll);
router.get('/:id', userCon.getOne);

router.post('/', userCon.createUser); // post = create
router.put('/:id', userCon.updateUser); // put = update
router.delete('/:id', userCon.deleteUser); // delete = delete

module.exports = router;