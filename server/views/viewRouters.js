const router = require('express').Router();

const viewController = require('./viewController');

router.route('/views')
    .get(viewController.index)


 router.route('/mostViewed')
    .get(viewController.mostViewed)
    
module.exports = router;