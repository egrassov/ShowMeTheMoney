const express = require('express');
const router  = express.Router();
const Zone = require('../models/Zone')

/* GET home page */
router.get('/', (req, res, next) => {
  Zone.find()
  .then(data=>res.json(data))
});

module.exports = router;
