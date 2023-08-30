const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* const jwtKey = require('../utils/config'); */

const BadRequestError = require('../utils/errors/BadRequestError-400');
const NotFoundError = require('../utils/errors/NotFoundError-404');
const ConflictError = require('../utils/errors/ConflictError-409');

const {
  USER_ID_NOT_FOUND,
  EMAIL_ALREADY_EXISTS,
  WRONG_CREATE_USER,
} = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(USER_ID_NOT_FOUND));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(201).json({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(WRONG_CREATE_USER));
      }
      return next(err);
    });
};

const updateUser = (req, res, next, updateData) => {
  User.findByIdAndUpdate(
    req.user._id,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_CREATE_USER));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(USER_ID_NOT_FOUND));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const updateData = { name, email };
  updateUser(req, res, next, updateData);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере произошла ошибка', err: err.message });
      next();
    });
};

module.exports = {
  getUser,
  createUser,
  updateUserInfo,
  login,
};
