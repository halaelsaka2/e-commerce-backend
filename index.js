const express = require("express");
const indexRouter = require("./routes/index");
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.json({
    "request url": req.url,
    method: req.method,
    "current time": Date.now(),
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    meesage: err.message,
    type: err.type,
    details: err.details,
  });
});

app.listen(port, () => console.log(`welcommmmmmmmmmmme running at port ${port}`));
