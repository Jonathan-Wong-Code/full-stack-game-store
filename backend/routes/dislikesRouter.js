const express = require('express');

const {
  addDislike,
  removeDislike,
} = require('../controllers/dislikesController');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').post(addDislike);
router.route('/:reviewId').delete(removeDislike);

module.exports = router;
