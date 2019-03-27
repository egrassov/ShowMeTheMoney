require("dotenv").config();
const mongoose = require("mongoose");
const data = require('./cityweekbyhours.js')
const Zone = require("../models/Zone");


mongoose.connect('mongodb://localhost/cityserver',{useNewUrlParser: true})
.then(() => {
  console.log("connect to mongoose");
  let newHours = data.map(e=>{
    return { 
    "Hour": e.Hour,
    "Merchantsbyhour": e.Merchantsbyhour,
    "Cardsbyhour": e.Cardsbyhour,
    "Txsbyhour": e.Txsbyhour,
    "Avgamountbyhour": e["Avg.amountbyhour"],
    "Maxamountbyhour": e["Max.amountbyhour"],
    "Minamountbyhour": e["Min.amountbyhour"],
    "Stdamounthour": e["Std.amounthour"]
    }
  })
  let newDays = []
  for(let i=0; i<data.length; i+=24){
    newDays.push({
      "Day": data[i].Day,
      "Merchantsbyday": data[i].Merchantsbyday,
      "Cardsbyday": data[i].Cardsbyday,
      "Txsbyday": data[i].Txsbyday,
      "Avgamountbyday": data[i]["Avg.amountbyday"],
      "Maxamountbyday": data[i]["Max.amountbyday"],
      "Minamountbyday": data[i]["Min.amountbyday"],
      "Stdamountbyday": data[i]["Std.amountbyday"],
      HoursArr: newHours.slice(i,i+24)
    })
  }

  let newobject = {
    "Zone": data[0].Zone,
    "Date": data[0].Date,
    "Source": data[0].Source,
    "Channel": data[0].Channel,
    "Category": data[0].Category,
    "Merchants": data[0].Merchants,
    "Cards": data[0].Cards,
    "Txs": data[0].Txs,
    "Avgamount": data[0]["Avg.amount"],
    DaysArr: newDays
    }
  return Zone.insertMany([newobject])
  
})
// .then(() => {
//   return Movie.insertMany([
//     {
//       title: "Dark City",
//       genre:"Drama",
//       plot: "Something happens somewhere"
//     },
//     {
//       title: "Red City",
//       genre:"Sci-fi",
//       plot: "Giant cows are here"
//     },
//     {
//       title: "Blue city",
//       genre:"Comedy",
//       plot: "Sex, drugs and rock n roll"
//     }
//   ])
// })
.then(result => {
  console.log("creo que ha funcionado hermano");
  mongoose.connection.close();
})