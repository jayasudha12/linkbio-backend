const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const {
  createLink,
  getLinks,
  updateLink,
  deleteLink
} = require('../controller/linkcontroller');

router.post('/', authMiddleware, createLink);
router.get('/', authMiddleware, getLinks);
router.put('/:id', authMiddleware, updateLink);
router.delete('/:id', authMiddleware, deleteLink);

module.exports = router;