const { all } = require("../routes/root");

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.benyamrepairshop.com",
  "https://www.benyamrepair.com",
];

module.exports = allowedOrigins;
