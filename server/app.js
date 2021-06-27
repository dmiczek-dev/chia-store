const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRoute = require('./routes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const { dbConnect } = require('./db/config');
const cors = require('cors');

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionSuccessStatus: process.env.CORS_OSS,
};

// Connect to PostgreSQL
dbConnect()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(indexRoute);
app.use(authRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is up!');
});

module.exports = app;
