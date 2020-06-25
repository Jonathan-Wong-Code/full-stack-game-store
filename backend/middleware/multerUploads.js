const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please only upload images!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSinglePhoto = upload.single('photo');

exports.resizeSinglePhoto = (width, height) => {
  return catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const image = await sharp(req.file.buffer)
      .resize(width, height)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
    req.file = image;
    next();
  });
};

exports.uploadGameImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 3,
  },
]);

exports.resizeGameImages = async (req, res, next) => {
  console.log(req.files);

  if (!req.files) return next();
  if (!req.files.imageCover && !req.files.images) return next();

  if (req.files.imageCover) {
    // CoverImage
    const imageCover = await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333) // 3/2 ratio.
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();
    req.files.imageCover = imageCover;
  }

  if (req.files.images) {
    // 2) Other images
    const images = await Promise.all(
      req.files.images.map((file) => {
        return sharp(file.buffer)
          .resize(972, 548) // 3/2 ratio.
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();
      })
    );

    req.files.images = images;
  }

  return next();
};
