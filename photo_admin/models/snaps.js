const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snapSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photographer: { type: String, required: true },
  snapImage: { type: String, required: true },
  date: { type: Date, default: Date.now }, 

});

const Snaps = mongoose.model('Snaps', snapSchema);

module.exports = Snaps;
