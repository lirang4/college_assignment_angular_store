const router = require('express').Router();

const filterController = require('./filterController');

router.route('/filters')
    .get(filterController.get)

module.exports = router;