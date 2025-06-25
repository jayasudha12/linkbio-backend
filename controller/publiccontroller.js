const Profile = require('../models/Profile');
const Link = require('../models/Link');

exports.getPublicProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username });
    if (!profile) return res.status(404).json({ message: 'User not found' });
    const links = await Link.find({ userId: profile.userId });
    res.json({
      username: profile.username,
      bio: profile.bio,
      profileImage: profile.profileImage,
      links
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
