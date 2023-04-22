const express = require("express");
const path = require("path");
const rootRoute = require("./routes/root");
const { logger } = require("./middleware/logger");
const errorhandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { DB_USERNAME, DB_PASSWORD, DATABASE } = require("./config/config");
const mongoose = require("mongoose");

const app = express();

app.use(logger);
app.use(cors(corsOptions)); // middleware that can be used to enable CORS with various options

app.use(express.json()); // parse json body
app.use(cookieParser()); // parse cookie

// telling express where to find static files like css or img
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRoute);

// catch all
app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  }

  if (req.accepts("json")) {
    return res.json({
      status: "fail",
      message: "404 Not Found",
    });
  }

  res.type("txt").send("404 Not Found");
});

// handel error middleware
app.use(errorhandler);

// connect to database

const DB = DATABASE.replace("<password>", DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("🟢 DB connection successful 🟢");
  })
  .catch((err) => {
    console.log(`🔴 DB failed to connect: ${err.message} 🔴`);
  });

// start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`🟢 started server on port ${PORT}...`);
});

// useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
