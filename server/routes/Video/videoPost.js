const express = require('express');
const router = express.Router();

const Videos = require('../../models/Video');

router.post('/videoPost', (req, res) => {
  return res.status(200).json({message: '!ll good here'});
  // Videos
  //   .find()
  //   .exec()
  //   .then(docs => {
  //     return res.status(200).json(docs);
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       error: err
  //     });
  //   });
});

module.exports = router;
