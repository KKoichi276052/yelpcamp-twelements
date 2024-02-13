const mongoose = require('mongoose');
const CampgroundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    // required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model('Campground', CampgroundSchema);
