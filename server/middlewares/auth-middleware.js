const ApiError = require('../exceptions/api-error');
const TokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.log('Authorization header is missing');
      return next(ApiError.UnauthorizedError());
    }

    const [bearer, accessToken] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      console.log('Invalid token format');
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      console.log('Invalid access token');
      return next(ApiError.UnauthorizedError());
    }

    if (!userData.id || !userData.email || !userData.isActivated) {
      console.log('Token payload is incomplete');
      return next(ApiError.UnauthorizedError());
    }

    req.user = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      isActivated: userData.isActivated
    };

    console.log(`✅ Authenticated user: ${userData.email}`);
    next();

  } catch (e) {
    console.error('❌ Authentication error:', e.message);
    return next(ApiError.UnauthorizedError());
  }
};
