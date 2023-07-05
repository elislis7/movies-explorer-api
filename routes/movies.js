const router = require('express').Router();

const {
  getMovies,
  createdMovies,
  deleteMovies,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', createMovieValidation, createdMovies);
router.delete('/:movieId', deleteMovieValidation, deleteMovies);

module.exports = router;
