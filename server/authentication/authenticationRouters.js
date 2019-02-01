const router = require('express').Router();

const authenticationController = require('./authenticationController');

router.route('/authentication')
    .post(authenticationController.authenticate);

module.exports = router;