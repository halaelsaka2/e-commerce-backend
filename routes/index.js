let express = require("express");
const app = express();
let user = require("./user");
let role = require("./role");
let product = require("./product");
let category = require("./category");
let subCategory = require("./subCategory");

app.use("/users", user);
app.use("/roles", role);
app.use("/products", product);
app.use("/categories", category);
app.use("/subCategories", subCategory);

module.exports = app;
