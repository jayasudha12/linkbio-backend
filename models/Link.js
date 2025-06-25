const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  url: { type: String, required: true }
});
module.exports = mongoose.model('Link', linkSchema);