const express = require('express');
const router = express.Router();
const { getPublicProfileByUsername } = require('../controller/publiccontroller');

router.get('/:username', getPublicProfileByUsername);

module.exports = router;