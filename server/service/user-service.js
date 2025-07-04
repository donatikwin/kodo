const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const TokenService = require('./token-service');
const UserDto = require('../dtos/user-dtos')

const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password, username){
    const candidate = await UserModel.findOne({email});

    if(candidate) {
      throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({email, password: hashPassword, username, activationLink});

    await mailService.sendActivationMail(
      email, 
      `${process.env.API_URL}/api/activate/${activationLink}`, 
      username);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  }

  async activate(activationLink){
    const user = await UserModel.findOne({activationLink});

    if(!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({email});

    if(!user) {
      throw ApiError.BadRequest('Пользователь с таким email не был найден!')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if(!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}


  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refreshToken(refreshToken){
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async getAllUsers () {
    const users = await UserModel.find();
    return users
  }

  async getMe(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw ApiError.NotFound('Пользователь не найден');
    }
    return {
      username: user.username,
      email: user.email
  };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound('Пользователь не найден');
    }
  
    const isPassEquals = await bcrypt.compare(currentPassword, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Текущий пароль неверен');
    }
  
    const hashNewPassword = await bcrypt.hash(newPassword, 3);
    user.password = hashNewPassword;
    await user.save();
  
    return { message: 'Пароль успешно изменён' };
  }

  async deleteAccount(userId, password) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound('Пользователь не найден');
    }
  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.BadRequest('Неверный пароль');
    }
  
    await UserModel.findByIdAndDelete(userId);
    await TokenService.removeTokensByUserId?.(userId); 
  
    return { message: 'Аккаунт успешно удалён' };
  }

}

module.exports = new UserService();