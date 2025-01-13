const express = require('express');
const userControler = require('../controllers/userController');

const router = express.Router();

router.post('/register', userControler.register);
router.post('/login', userControler.register);

module.exports = router;