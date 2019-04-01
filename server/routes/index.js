const express = require('express');
const router  = express.Router();
const Zone = require('../models/Zone')
const ZoneGeneral = require('../models/ZoneGeneral')

/* GET home page */
router.get('/', (req, res, next) => {
  ZoneGeneral.find()
  .then(data=>res.json(data))
})

router.get('/txsbyhours', (req, res, next) => {
  Zone.find({},"Zone DaysArr.HoursArr.Txsbyhour")
  .then(data=>{
    let zones = []
    data.forEach((zone,ind)=>{
      zones[ind]=[]
      zone.DaysArr.forEach(day => {
        day.HoursArr.forEach(hour => {
          zones[ind].push(hour.Txsbyhour)
        })
      })
    })
    res.json(zones)
  })
});

module.exports = router;
