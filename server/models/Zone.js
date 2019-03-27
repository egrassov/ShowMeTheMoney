const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


// Modelo con validación de datos y conversión de 'name'
const zoneSchema = new Schema({
  "Zone": String,
  "Date": String,
  "Source": String,
  "Channel": String,
  "Category": String,
  "Merchants": String,
  "Cards": String,
  "Txs": String,
  "Avgamount": String,
  "DaysArr": [{
    "Day": String,
    "Merchantsbyday": String,
    "Cardsbyday": String,
    "Txsbyday": String,
    "Avgamountbyday": String,
    "Maxamountbyday": String,
    "Minamountbyday": String,
    "Stdamountbyday": String,
    "HoursArr": [{
      "Hour": String,
      "Merchantsbyhour": String,
      "Cardsbyhour": String,
      "Txsbyhour": String,
      "Avgamountbyhour": String,
      "Maxamountbyhour": String,
      "Minamountbyhour": String,
      "Stdamounthour": String
    }]
  }]
})



// Crear modelo pasando a .model() el nombre del modelo y el esquema
const Zone = mongoose.model('Zone', zoneSchema);


// Exportar el modelo para requerirlo en otros módulos
module.exports = Zone;