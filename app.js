import express from "express";

import logger from "morgan";

import headers from "./middlewares/header";

import cookieParser from "cookie-parser";
import indexRouter from './routes/index';
import createError from "http-errors";



import path from "path";

import cors from "cors"

const app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(headers);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, _)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
