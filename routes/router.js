const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');

const NotFoundError = require('../utils/errors/NotFoundError-404');

router.use('/users', users);
router.use('/movies', movies);

router.use((req, res, next) => {
  next(new NotFoundError('Ошибка! Данные не найдены!'));
});

module.exports = router;
