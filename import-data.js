const mongoose = require("mongoose");
const User = require("./models/userModel");
const { DB_USERNAME, DB_PASSWORD, DATABASE } = require("./config/config");
const fs = require("fs");

const DB = DATABASE.replace("<password>", DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("🟢 DB connection successful 🟢");
  })
  .catch((err) => {
    console.log(`🔴 DB failed to connect: ${err.message} 🔴`);
  });

const users = JSON.parse(
  fs.readFileSync("./users.json", (err) => {
    console.log("wrong path");
  })
);

const importData = async () => {
  try {
    await User.create(users);

    console.log("Users imported successfully");
  } catch (err) {
    console.log(`Import failed: ${err.message}`);
  }
};

// importData();
