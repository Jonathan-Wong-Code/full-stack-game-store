const express = require('express');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');

const gameRouter = require('./routes/gameRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const myGamesRouter = require('./routes/myGamesRouter');
const wishlistRouter = require('./routes/myWishlistRouter');
const orderRouter = require('./routes/orderRouter');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const { cloudinaryConfig } = require('./middleware/cloudinary');

const app = express();
app.enable('trust proxy');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// app.options('*', cors());

//Set  Security HTTP Headers
app.use(helmet());

// Limit requests from same api
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS attacks
app.use(xss());

app.use(compression());

app.use('/api', limiter);

app.use(express.json());

app.use('*', cloudinaryConfig);

app.use('/api/v1/games', gameRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/myGames', myGamesRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
