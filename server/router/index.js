const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const vacancyController = require('../controllers/vacancy-controller');
const goalRouter = require('./goal-router');
const progressRouter = require('./progress-router');

const authMiddleware = require('../middlewares/auth-middleware');
const { body } = require('express-validator');

const router = new Router();

// Регистрация
router.post(
  '/registration', 
  body('email').isEmail().withMessage('Неверный формат email'),
  body('password').isLength({ min: 6, max: 32 }).withMessage('Пароль должен быть от 6 до 32 символов'),
  body('username')
    .isLength({ min: 3, max: 20 }).withMessage('Имя пользователя должно быть от 3 до 20 символов')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Имя пользователя может содержать только буквы, цифры и нижнее подчёркивание'),
  userController.registration
);

// Аутентификация
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/me', authMiddleware, userController.getMe);
router.patch('/change-password', authMiddleware, userController.changePassword);
router.delete('/delete-account', authMiddleware, userController.deleteAccount);

// Вакансии
router.get('/vacancies', vacancyController.getVacancies);

// toDo Goal
router.use('/goals', goalRouter);

//progress
router.use('/progress', progressRouter);

module.exports = router;
