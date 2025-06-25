const Link = require('../models/Link');

exports.createLink = async (req, res) => {
  const { title, url } = req.body;
  const newLink = new Link({ userId: req.userId, title, url });
  await newLink.save();
  res.status(201).json({ message: 'Link created', link: newLink });
};

exports.getLinks = async (req, res) => {
  const links = await Link.find({ userId: req.userId });
  res.json(links);
};

exports.updateLink = async (req, res) => {
  const { title, url } = req.body;
  const updated = await Link.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, url },
    { new: true }
  );
  res.json({ message: 'Link updated', link: updated });
};

exports.deleteLink = async (req, res) => {
  await Link.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Link deleted' });
};

