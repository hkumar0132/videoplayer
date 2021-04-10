const express = require('express');
const router = express.Router();

const Videos = require('../../models/Video');

router.get('/videoGet', (req, res) => {
  Videos
    .find()
    .exec()
    .then(docs => {
      return res.status(200).json(docs);
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
