const express = require("express");
const path = require("path");
const rootRoute = require("./routes/root");

const app = express();

// parse json body
app.use(express.json());

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

// start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`started listening on ${PORT}...`);
});
