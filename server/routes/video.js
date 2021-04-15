const express = require('express');
const router = express.Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

const mongoURI = require('../config/key');

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /videoGet - gets all videos
router.get('/videoGet', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'video/mp4' ||
          file.contentType === 'video/mp4'
        ) {
          file.isVideo = true;
        } else {
          file.isVideo = false;
        }
      });
      res.render({ files: files });
    }
  });
});

// @route POST videoPost - posts a video
router.post('/videoPost', upload.single('file'), (req, res) => {
  console.log('I am here! - videoPost');
});

// @route GET videoGet/:filename - gets a video with particular filename and streams it
router.get('/videoGet/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //Check if file exists
    if(!file || file.length === 0) {
      return res.status(404).json({ err: 'Does not exist' });
    }

    // Check if file is a video
    if (file.contentType === 'mp4') {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not a video'
      });
    }
  });
});

module.exports = router;