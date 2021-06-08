const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRoute = require('./routes');
const authRoutes = require('./routes/auth');
const { dbConnect, getClient } = require('./db/config');

dotenv.config();
const app = express();

// Connect to PostgreSQL
dbConnect()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(indexRoute);
app.use(authRoutes);

app.listen(3000, () => {
  console.log('Server is up!');
});

module.exports = app;
