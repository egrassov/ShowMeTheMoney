require("dotenv").config();
const mongoose = require("mongoose");
const data = require('./ziprelations.js')
const ZipRelations = require("../models/ZipRelations");


mongoose.connect(process.env.DB,{useNewUrlParser: true})
.then(() => {
  console.log("connect to mongoose");

  let firstobject = {
    type: "full",
    packageNames: [],
    matrixTxs: [],
    matrixAvg: [],
    matrixVolume: []
  }
  let x = undefined
  let u,v
  for(let i=1; i<=54; i++){
    if(i<10) {firstobject.packageNames.push(`2800${i}`)}
    else {firstobject.packageNames.push(`280${i}`)}
    firstobject.matrixTxs.push(Array(54).fill(0))
    firstobject.matrixAvg.push(Array(54).fill(0))
    firstobject.matrixVolume.push(Array(54).fill(0))
  }

  data.forEach(e => {
    x = parseInt(e.Origin)%100-1
    if(!isNaN(x)&&x<54){
      u = parseInt(e.Txs)
      v = parseInt(e.Avgamount)
      firstobject.matrixTxs[parseInt(e.Zone)%100-1][x] = u
      firstobject.matrixAvg[parseInt(e.Zone)%100-1][x] = v
      firstobject.matrixVolume[parseInt(e.Zone)%100-1][x] = u*v
    }
  })

    let secondobject = {
    type: "500",
    packageNames: [],
    matrixTxs: [],
    matrixAvg: [],
    matrixVolume: []
  }

  for(let i=1; i<=54; i++){
    if(i<10) {secondobject.packageNames.push(`2800${i}`)}
    else {secondobject.packageNames.push(`280${i}`)}
    secondobject.matrixTxs.push(Array(54).fill(0))
    secondobject.matrixAvg.push(Array(54).fill(0))
    secondobject.matrixVolume.push(Array(54).fill(0))
  }

  data.forEach(e => {
    x = parseInt(e.Origin)%100-1
    if(!isNaN(x)&&x<54&&parseInt(e.Txs)>500){
      u = parseInt(e.Txs)
      v = parseInt(e.Avgamount)
      secondobject.matrixTxs[parseInt(e.Zone)%100-1][x] = u
      secondobject.matrixAvg[parseInt(e.Zone)%100-1][x] = v
      secondobject.matrixVolume[parseInt(e.Zone)%100-1][x] = u*v
    }
  })


  let thirddobject = {
  type: "1000",
  packageNames: [],
  matrixTxs: [],
  matrixAvg: [],
  matrixVolume: []
  }

  for(let i=1; i<=54; i++){
    if(i<10) {thirddobject.packageNames.push(`2800${i}`)}
    else {thirddobject.packageNames.push(`280${i}`)}
    thirddobject.matrixTxs.push(Array(54).fill(0))
    thirddobject.matrixAvg.push(Array(54).fill(0))
    thirddobject.matrixVolume.push(Array(54).fill(0))
  }

  data.forEach(e => {
    x = parseInt(e.Origin)%100-1
    if(!isNaN(x)&&x<54&&parseInt(e.Txs)>1000){
      u = parseInt(e.Txs)
      v = parseInt(e.Avgamount)
      thirddobject.matrixTxs[parseInt(e.Zone)%100-1][x] = u
      thirddobject.matrixAvg[parseInt(e.Zone)%100-1][x] = v
      thirddobject.matrixVolume[parseInt(e.Zone)%100-1][x] = u*v
    }
  })




  let fourthobject = {
    type: "1500",
    packageNames: [],
    matrixTxs: [],
    matrixAvg: [],
    matrixVolume: []
  }

  for(let i=1; i<=54; i++){
    if(i<10) {fourthobject.packageNames.push(`2800${i}`)}
    else {fourthobject.packageNames.push(`280${i}`)}
    fourthobject.matrixTxs.push(Array(54).fill(0))
    fourthobject.matrixAvg.push(Array(54).fill(0))
    fourthobject.matrixVolume.push(Array(54).fill(0))
  }

  data.forEach(e => {
    x = parseInt(e.Origin)%100-1
    if(!isNaN(x)&&x<54&&parseInt(e.Txs)>1500){
      u = parseInt(e.Txs)
      v = parseInt(e.Avgamount)
      fourthobject.matrixTxs[parseInt(e.Zone)%100-1][x] = u
      fourthobject.matrixAvg[parseInt(e.Zone)%100-1][x] = v
      fourthobject.matrixVolume[parseInt(e.Zone)%100-1][x] = u*v
    }
  })

  return ZipRelations.insertMany([firstobject,secondobject,thirddobject,fourthobject])
  
})

.then(result => {
  console.log("creo que ha funcionado hermano");
  mongoose.connection.close();
})