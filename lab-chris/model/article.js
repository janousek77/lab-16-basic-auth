'use strict';

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true, minlength: 1},
  content: {type: String, required: true, minlength: 1},
  photoURI: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('article', articleSchema);
