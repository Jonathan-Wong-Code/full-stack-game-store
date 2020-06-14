const express = require('express');

const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(createOrder).get(getOrders);

module.exports = router;
