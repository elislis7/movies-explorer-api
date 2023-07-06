const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');

const auth = require('../middlewares/auth');

const { createUserValidation, loginValidation } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../utils/errors/NotFoundError-404');

const { URL_NOT_FOUND } = require('../utils/constants');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(URL_NOT_FOUND));
});

module.exports = router;
