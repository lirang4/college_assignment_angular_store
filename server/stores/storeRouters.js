const router = require('express').Router();

const storeController = require('./storeController');

router.route('/stores')
    .get(storeController.index)
    .post(storeController.new);

router.route('/store/addPhone')
    .post(storeController.addPhone)
    .put(storeController.addPhone)

module.exports = router;