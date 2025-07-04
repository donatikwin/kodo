const express = require('express');
const router = express.Router();

const progressController = require('../controllers/progress-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, progressController.updateProgress);
router.get('/', authMiddleware, progressController.getProgress);

module.exports = router;
