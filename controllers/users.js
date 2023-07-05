const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

const BadRequestError = require('../utils/errors/BadRequestError-400');
const NotFoundError = require('../utils/errors/NotFoundError-404');
const ConflictError = require('../utils/errors/ConflictError-409');

const findUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => findUser(req.params._id, res, next);

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then(() => {
          res.status(201).send({
            data: {
              name, email,
            },
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          }
          return next(err);
        });
    })
    .catch(next);
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
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
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
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT-token', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  updateUserInfo,
  login,
};
