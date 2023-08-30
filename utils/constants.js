// Блок с фильмами
const NOT_FOUND_MOVIE = 'Фильм с указанным id не найден';
const WRONG_MOVIE = 'Переданы некорректные данные при создании карточки фильма';
const DELETE_WRONG_MOVIE = 'Переданы некорректные данные при попытке удалить карточку фильма';

// Блок с пользователем
const USER_ID_NOT_FOUND = 'Пользователь с указанным _id не найден';
const EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
const WRONG_CREATE_USER = 'Переданы некорректные данные при создании пользователя';

// Блок с общими ошибками
const AUTH_REQUIRED = 'Необходима авторизация!';
const SERVER_ERROR = 'На сервере произошла ошибка';
const WRONG_URL = 'Некорректная ссылка';
const WRONG_EMAIL = 'Неправильный формат почты';
const WRONG_EMAIL_OR_PASSWORD = 'Неправильная почта или пароль';
const URL_NOT_FOUND = '404: Ошибка! Данные не найдены!';
const WRONG_DATA = 'Переданы некорректные данные';

module.exports = {
  NOT_FOUND_MOVIE,
  WRONG_MOVIE,
  DELETE_WRONG_MOVIE,
  USER_ID_NOT_FOUND,
  EMAIL_ALREADY_EXISTS,
  WRONG_CREATE_USER,
  AUTH_REQUIRED,
  SERVER_ERROR,
  WRONG_URL,
  WRONG_EMAIL,
  WRONG_EMAIL_OR_PASSWORD,
  URL_NOT_FOUND,
  WRONG_DATA,
};
