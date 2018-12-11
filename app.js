global.__BASE__ = __dirname + "/";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const LOGGER = require(__BASE__ + "modules/utils/Logger");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************************************************/
/*************** Database Connection ****************/
/****************************************************/
const dbUrl =
   'mongodb://sahilayank:woV27rB70hNF4IRr@cluster0-shard-00-00-r1tkp.mongodb.net:27017,cluster0-shard-00-01-r1tkp.mongodb.net:27017,cluster0-shard-00-02-r1tkp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true' ||
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}/${
        process.env.MONGO_DB
        }`
mongoose.connect(
    dbUrl,
    function(err) {
        if (err) {
            LOGGER.log.error(
                LOGGER.PREFIX.DATABASE + "Database connection failed",
                err
            )
        } else {
            LOGGER.log.debug(
                LOGGER.PREFIX.DATABASE + "Database connection successful"
            )
        }
    }
);

mongoose.set("debug", true);


/****************************************************/
/******************* Routes Setup *******************/
/****************************************************/
const UI_INDEX = require(__BASE__ + "routes/index");
const SERVICE_authenticate = require(__BASE__ + "routes/service/authenticate");
const SERVICE_order = require(__BASE__ + "routes/service/order");
const SERVICE_feedback = require(__BASE__ + "routes/service/feedback");

/****************************************************/
/****************** Routes Mapping ******************/
/****************************************************/
app.use('/', UI_INDEX);
app.use('/service/authenticate', SERVICE_authenticate);
app.use('/service/order', SERVICE_order);
app.use('/service/feedback',SERVICE_feedback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
