const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // create unique IDs
const fs = require("fs");
const fsPromises = require("fs").promises; // promisified file
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`; // formatting date and time
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // uuid creates a unique id

  try {
    // check if log folder exists, if not create it
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logEvents, logger };
