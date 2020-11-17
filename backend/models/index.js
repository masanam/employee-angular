const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');

mongoose.Promise;
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.employees = require("./employee.model.js")(mongoose);

module.exports = db;
