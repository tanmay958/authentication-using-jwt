const express = require('express');

const UserController = require('../../controllers/user-controller');

const validator = require("../../middlewares/user-middleware");

const router = express.Router();

router.post('/signup', UserController.create);
router.post('/signin',UserController.signin);

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated,
)
router.get(
    '/isAdmin',
    validator.validateIsAdminRequest,
    UserController.isAdmin
);

module.exports = router;