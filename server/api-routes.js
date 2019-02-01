const router = require('express').Router();

const contactRouter = require('./contact/contactRouters');

router.use(contactRouter);

module.exports = router;