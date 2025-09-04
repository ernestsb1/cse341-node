const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Data', DataSchema, 'ernest-cse341');
