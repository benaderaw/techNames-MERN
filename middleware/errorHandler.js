const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${err.method}\t${err.url}\t${req.headers.origin}`,
    "errLog.log"
  );

  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({
    status: "fail",
    message: err.message,
  });

  next();
};

module.exports = errorHandler;
