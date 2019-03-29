const express = require('express');
const router  = express.Router();
const Zone = require('../models/Zone')
const ZoneGeneral = require('../models/ZoneGeneral')

/* GET home page */
router.get('/', (req, res, next) => {
  ZoneGeneral.find()
  .then(data=>res.json(data))
});

module.exports = router;
