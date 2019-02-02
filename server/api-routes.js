const router = require('express').Router();

const contactRouter = require('./contact/contactRouters');
const authenticationRouter = require('./authentication/authenticationRouters');
const phoneRouter = require('./phone/phoneRouters');
const filtersRouter = require('./filters/filterRouters');
const storesRouter = require('./stores/storeRouters');

router.use(authenticationRouter);
router.use(contactRouter);
router.use(phoneRouter);
router.use(filtersRouter);
router.use(storesRouter);

module.exports = router;