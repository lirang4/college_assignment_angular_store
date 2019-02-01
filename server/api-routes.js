const router = require('express').Router();

const contactRouter = require('./contact/contactRouters');
const authenticationRouter = require('./authentication/authenticationRouters');

router.use(contactRouter);
router.use(authenticationRouter);

module.exports = router;