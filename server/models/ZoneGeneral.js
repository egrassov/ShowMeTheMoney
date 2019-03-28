const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const zonegeneralSchema = new Schema({
  "Zone": String,
  "Date": String,
  "Source": String,
  "Channel": String,
  "Category": String,
  "Merchants": String,
  "Cards": String,
  "Txs": String,
  "Avgamount": String,
  "Maxamount": String,
  "Minamount": String,
  "Stdamount": String,
  "Peakday": String,
  "Valleyday": String,
  "Peakhour": String,
  "Valleyhour": String
})



const ZoneGeneral = mongoose.model('ZoneGeneral', zonegeneralSchema);


module.exports = ZoneGeneral;