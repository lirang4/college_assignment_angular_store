const router = require('express').Router();

const viewController = require('./viewController');

router.route('/views')
    .get(viewController.index)
    .post(viewController.new);

module.exports = router;