var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var categorieRouter = require('./routes/categories');
var commentaireRouter = require('./routes/commentaire');
var authenticationRouter = require('./routes/authentication');
const {verifyTokenMiddleware} = require("./jwtMiddleware/jwtMiddleware");

var app = express();

app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles',verifyTokenMiddleware, articlesRouter);
app.use('/categories',verifyTokenMiddleware, categorieRouter);
app.use('/commentaire',verifyTokenMiddleware, commentaireRouter);
app.use('/auth',authenticationRouter);



module.exports = app;
