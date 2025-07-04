const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');

class UserController {
  async registration(req, res, next) {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
          return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }

        const {email, password, username} = req.body;
        const userData = await userService.registration(email, password, username);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
        })
        return res.json(userData);
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {

      const {email, password} = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
        })
      return res.json(userData);

    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }
  async activate(req, res, next) {
    try {

      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);

    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refreshToken(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
        })
      return res.json(userData);

    } catch (e) {
      next(e)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e)
    }
  }

  async getMe(req, res, next) {
    try {
      if (!req.user) throw ApiError.UnauthorizedError();
    
      const user = await UserModel.findById(req.user.id);
      if (!user) throw ApiError.NotFound('User not found');
    
      res.json({
        username: user.username,
        email: user.email
      });
    } catch (e) {
      console.error('GetMe error:', e);
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
    
      if (!currentPassword || !newPassword) {
        throw ApiError.BadRequest('Необходимо указать текущий и новый пароль');
      }
    
      const result = await userService.changePassword(userId, currentPassword, newPassword);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteAccount(req, res, next) {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      throw ApiError.BadRequest('Необходимо ввести пароль для удаления');
    }

    const result = await userService.deleteAccount(userId, password);
    res.clearCookie('refreshToken');
    return res.json(result);
  } catch (e) {
    next(e);
  }
  }

  
}

module.exports = new UserController();