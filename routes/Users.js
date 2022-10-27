const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const checkEmail = require('../middlewares/checkEmail')
const authRole = require('../middlewares/authRole')
const authenticate = require('../middlewares/authenticate')

router.post('/login',
    UserController.signInUser
);
router.post('/create',
    checkEmail,
    UserController.createUser
);
router.post('/create-admin',
    authenticate,
    authRole(['admin']),
    checkEmail,
    UserController.createAdmin
);

module.exports = router