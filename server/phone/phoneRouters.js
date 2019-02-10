const router = require('express').Router();

const phoneController = require('./phoneController');

router.route('/phones')
    .get(phoneController.index)
    .post(phoneController.new);

router.route('/phone/:phone_id')
    .get(phoneController.view)
    .post(phoneController.update)
    .put(phoneController.update)
    .delete(phoneController.delete);

router.route('/phones/filters/')
    .post(phoneController.filters);

router.route('/availableStores/:phone_id')
    .get(phoneController.availableStores);


module.exports = router;