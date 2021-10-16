const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const counterRouter = require('./routes/counter');

const app = express();

app.use(cors());

app.use(logger('dev'));

app.use(express.json());

app.use('/', indexRouter);

app.use('/todos', todosRouter);
// 12.7
app.use('/todos:id', todosRouter);
//12.10
app.use('/statistics',counterRouter);

module.exports = app;
