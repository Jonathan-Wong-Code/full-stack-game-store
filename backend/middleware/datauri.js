const DatauriParser = require('datauri/parser');

const dUri = new DatauriParser();

// generic middle ware to process single image to base 64.
exports.dataUriSingle = (req, res, next) => {
  if (req.file) {
    const file = dUri.format('.jpeg', req.file.buffer).content;
    req.dUriFormattedFile = file;
  }

  next();
};

// converts images for games to base 64.
exports.dataUriGames = (req, res, next) => {
  if (req.files && req.files.imageCover) {
    const imageCoverFile = dUri.format('.jpeg', req.files.imageCover.buffer);
    req.imageCover = imageCoverFile.content;
  }

  if (req.files && req.files.images) {
    const images = req.files.images.map((file) => {
      return dUri.format('.jpeg', file.buffer).content;
    });
    req.images = images;
  }
  next();
};
