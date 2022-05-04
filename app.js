const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/posts');

const app = express();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

// 連接資料庫
mongoose.connect(DB)
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postRouter);

module.exports = app;
