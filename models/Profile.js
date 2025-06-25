const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  username: { type: String, required: true, unique: true },
  bio: String,
  profileImage: String
});
module.exports = mongoose.model('Profile', profileSchema);