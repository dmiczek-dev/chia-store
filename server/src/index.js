const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRoute = require("./routes");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const statsRoutes = require("./routes/stats");
const { dbConnect } = require("./db/config");
const { getChiaStats } = require("./jobs/scheduler");
const cors = require("cors");

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionSuccessStatus: process.env.CORS_OSS,
  credentials: true,
};

// Connect to PostgreSQL
dbConnect();

//Run scheduler
getChiaStats();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(indexRoute);
app.use(authRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(statsRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is up!");
});

module.exports = app;
