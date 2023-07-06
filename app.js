require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rateLimiter');

const router = require('./routes/index');
const handelError = require('./middlewares/handelError');
const baseUrl = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { NODE_ENV, DB_CONNECT } = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handelError);

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECT : baseUrl);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
