const Profile = require('../models/Profile');
const Link = require('../models/Link');

exports.createProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const userId = req.userId;
    const profileImage = req.file ? req.file.path : null;

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const newProfile = new Profile({ userId, username, bio, profileImage });
    await newProfile.save();
    res.status(201).json({ message: 'Profile created', profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const userId = req.userId;
    const profileImage = req.file ? req.file.path : null;
    const profile = await Profile.findOne({ userId });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.username = username;
    profile.bio = bio;
    if (profileImage) profile.profileImage = profileImage;
    await profile.save();
    res.json({ message: 'Profile updated', profile });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
};

exports.deleteProfile = async (req, res) => {
  await Profile.findOneAndDelete({ userId: req.userId });
  res.json({ message: 'Profile deleted' });
};


exports.getProfileWithLinks = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const links = await Link.find({ userId: req.userId });

    res.json({
      username: profile.username,
      bio: profile.bio,
      profileImage: profile.profileImage,
      links: links
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
