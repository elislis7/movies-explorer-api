require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');
const handelError = require('./middlewares/handelError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handelError);

mongoose.connect(DB_CONNECT);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
