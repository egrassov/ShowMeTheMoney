require("dotenv").config();
const mongoose = require("mongoose");
const data = require('./generalstatsbyzip.js')
const ZoneGeneral = require("../models/ZoneGeneral");


mongoose.connect(process.env.DB,{useNewUrlParser: true})
.then(() => {
  return ZoneGeneral.insertMany(data)
})

.then(result => {
  console.log("creo que ha funcionado hermano");
  mongoose.connection.close();
})