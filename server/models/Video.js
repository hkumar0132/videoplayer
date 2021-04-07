const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  length: {
    type: String
  },
  video_path: { 
    type: String, 
    required: true 
  },
  thumbnailPath: { 
    type: String, 
    required: true 
  },
  chunkSize: {
    type: String,
    required: true
  },
  uploadDate: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  md5: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }