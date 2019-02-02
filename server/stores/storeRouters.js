const router = require('express').Router();

const storeController = require('./storeController');

router.route('/stores')
    .get(storeController.index)
    .post(storeController.new);

module.exports = router;