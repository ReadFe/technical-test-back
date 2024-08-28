const router = require('express').Router();
const User = require('../app/user/model');
const Category = require('../app/category/model');
const Product = require('../app/product/model');
const Order = require('../app/order/model');

router.post('/addUser', async (req, res, next) => {
    try {
        const result = await User.create({
            us_name: 'John Doe',
            us_password: 'password123',
            us_email: 'john@example.com',
            us_phone_number: '1234567890',
            us_address: '123 Main St',
        });

        res.json(result)
    } catch (error) {
        res.json({
            error: 1,
            message: error.message
        })
    }
})

router.post('/addCategory', async (req, res, next) => {
    try {
        const result = await Category.create({
            ct_code: 'CAT01',
            ct_name: 'Electronics'
        });

        res.json(result)
    } catch (error) {
        res.json({
            error: 1,
            message: error.message
        })
    }
})

router.post('/addProduct', async (req, res, next) => {
    try {
        const result = await Product.create({
            pd_code: 'PROD01',
            pd_name: 'Smartphone',
            pd_price: 299.99,
            pd_ct_id: "66c592c6eee658add9c567c6",
        });

        res.json(result)
    } catch (error) {
        res.json({
            error: 1,
            message: error.message
        })
    }
})

router.post('/addOrder', async (req, res, next) => {
    try {
        const result = await Order.create({
            or_pd_id: "66c592c6eee658add9c567c6",
            or_amount: 2
        });

        res.json(result)
    } catch (error) {
        res.json({
            error: 1,
            message: error.message
        })
    }
})

module.exports = router;