const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2 },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true, min: 1450 },
  pages: { type: Number, required: true, min: 1 },
  rating: { type: Number, min: 0, max: 5 },
  available: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Book', bookSchema, 'books');


