import '@babel/polyfill';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import createError from 'http-errors';

import api from './routes/api';
import env from './config/env';

const app = express();

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(json());

app.use('/v1', api);

app.get('/', (req, res) => {
  res.send('Welcome to cassava');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page

  console.log(err.message)
  res.status(err.status || 500).json({
    status: "fail",
    message: err.message,
  });
});

export default app;