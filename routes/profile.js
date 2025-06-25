const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authmiddleware');
const {
  createProfile,
  updateProfile,
  getProfile,
  deleteProfile
} = require('../controller/profilecontroller');
const { getProfileWithLinks } = require('../controller/profilecontroller');

router.post('/', authMiddleware, upload.single('profileImage'), createProfile);
router.put('/', authMiddleware, upload.single('profileImage'), updateProfile);
router.get('/', authMiddleware, getProfile);
router.delete('/', authMiddleware, deleteProfile);
router.get('/with-links', authMiddleware, getProfileWithLinks);


module.exports = router;