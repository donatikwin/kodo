const Router = require('express').Router;
const goalController = require('../controllers/goal-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.get('/', authMiddleware, goalController.getGoals);
router.post('/', authMiddleware, goalController.addGoal);
router.patch('/:id', authMiddleware, goalController.updateGoal);
router.delete('/:id', authMiddleware, goalController.deleteGoal);

module.exports = router;
