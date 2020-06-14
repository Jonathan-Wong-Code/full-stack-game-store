const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');

exports.createOrder = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  const order = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate({
    path: 'games',
    select: 'title total totalWithTax tax cardPhoto _id',
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});
