const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const ziprelationsSchema = new Schema({
  type:String,
  packageNames: [String],
  matrixTxs: [],
  matrixVolume: [],
  matrixAvg: []
})



const ZipRelations = mongoose.model('ZipRelations', ziprelationsSchema);


module.exports = ZipRelations;