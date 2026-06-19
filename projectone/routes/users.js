var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller')
// const adminMiddleware = require('../middlewares/check.middleware')
// router.use(adminMiddleware.adminOnly)

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;
