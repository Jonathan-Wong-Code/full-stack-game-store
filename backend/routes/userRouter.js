const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  checkLoggedIn,
  logout,
} = require('../controllers/authController');

const { protect, restrictToRole } = require('../middleware/auth');
const {
  updateMe,
  deleteMe,
  getAllUsers,
  getMe,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require('../controllers/userController');

const {
  uploadSinglePhoto,
  resizeSinglePhoto,
} = require('../middleware/multerUploads');

const { dataUriSingle } = require('../middleware/datauri');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.post('/checkLoggedIn', checkLoggedIn);
router.get('/logout', logout);

router.use(protect);

router.post('/updatePassword', updatePassword);
router.patch(
  '/updateMe',
  uploadSinglePhoto,
  resizeSinglePhoto(400, 400),
  dataUriSingle,
  updateMe
);
router.delete('/deleteMe', deleteMe);
router.get('/getMe', getMe);

router.use(restrictToRole('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').delete(deleteUser).patch(updateUser).get(getUser);

module.exports = router;
