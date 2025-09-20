const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    lowercase: true,
    trim: true,
    unique: true
  },
  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required'],
    trim: true
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value.valueOf());
      },
      message: 'Please provide a valid date for birthday'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
