const router = require('express').Router();

const contactRouter = require('./contact/contactRouters');
const authenticationRouter = require('./authentication/authenticationRouters');
const phoneRouter = require('./phone/phoneRouters');

router.use(authenticationRouter);
router.use(contactRouter);
router.use(phoneRouter);

module.exports = router;