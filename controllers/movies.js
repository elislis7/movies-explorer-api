const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/BadRequestError-400');
const NotFoundError = require('../utils/errors/NotFoundError-404');
const ForbiddenError = require('../utils/errors/ForbiddenError-403');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createdMovies = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    description,
    year,
    duration,
    director,
    country,
    image,
    thumbnail,
    trailer,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    nameRU,
    nameEN,
    description,
    year,
    duration,
    director,
    country,
    image,
    thumbnail,
    trailer,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovies = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError(`Фильм с id ${movieId} не найден`))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужую карточку'));
      }
      return movie.deleteOne()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createdMovies,
  deleteMovies,
};
