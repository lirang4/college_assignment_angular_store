const router = require('express').Router();

const contactRouter = require('./contact/contactRouters');
const authenticationRouter = require('./authentication/authenticationRouters');
const phoneRouter = require('./phone/phoneRouters');
const filtersRouter = require('./filters/filterRouters');

router.use(authenticationRouter);
router.use(contactRouter);
router.use(phoneRouter);
router.use(filtersRouter);

module.exports = router;