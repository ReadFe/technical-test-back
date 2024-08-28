const router = require('express').Router();
const userRoute = require('./user/router');
const productRoute = require('./product/router');
const categoryRoute = require('./category/router');
const orderRoute = require('./order/router');

router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/category', categoryRoute)
router.use('/order', orderRoute)

module.exports = router;