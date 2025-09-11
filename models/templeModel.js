// models/templeModel.js
const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  temple_id: { type: Number, required: true, unique: true },
  additionalInfo: { type: Boolean, default: false },
  name: { type: String, required: true },
  location: { type: String, required: true },
  dedicated: { type: String },
});

const temple = mongoose.model('Temple', templeSchema);

module.exports = temple;