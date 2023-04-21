const allowedOrigins = require("./allowedOrigins");

const coresOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  Credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = coresOptions;
