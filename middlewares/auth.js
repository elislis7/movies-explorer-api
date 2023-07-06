const jwt = require('jsonwebtoken');

const NotAuthError = require('../utils/errors/NotAuthError-401');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
