const mongoose = require('mongoose');
const validator = require('validator');

const { WRONG_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    nameRU: {
      type: String,
      require: true,
    },

    nameEN: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    year: {
      type: String,
      require: true,
    },

    duration: {
      type: Number,
      require: true,
    },

    director: {
      type: String,
      require: true,
    },

    country: {
      type: String,
      require: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: WRONG_URL,
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: WRONG_URL,
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: WRONG_URL,
      },
    },

    movieId: {
      type: Number,
      require: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
