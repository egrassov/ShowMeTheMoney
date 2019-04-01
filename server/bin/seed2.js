require("dotenv").config();
const mongoose = require("mongoose");
const data = require('./testbyzip.js')
const Zone = require("../models/Zone");


mongoose.connect(process.env.DB,{useNewUrlParser: true})
.then(() => {
  console.log("connect to mongoose")
  console.log(data.length)
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
  let newobjects = []
  let counter = 0
  for(let i=0; i<data.length; i+=168){
    newobjects.push({
    "Zone": data[i].Zone,
    "Date": data[i].Date,
    "Source": data[i].Source,
    "Channel": data[i].Channel,
    "Category": data[i].Category,
    "Merchants": data[i].Merchants,
    "Cards": data[i].Cards,
    "Txs": data[i].Txs,
    "Avgamount": data[i]["Avg.amount"],
    DaysArr: newDays.slice(counter,counter+7)
    })
    counter += 7
  }
  return Zone.insertMany(newobjects)
  
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