const jwt = require('jsonwebtoken');
const jwtKey = require('../utils/config');

const NotAuthError = require('../utils/errors/NotAuthError-401');

const { AUTH_REQUIRED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError(AUTH_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtKey);
  } catch (err) {
    return next(new NotAuthError(AUTH_REQUIRED));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
