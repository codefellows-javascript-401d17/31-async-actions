'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('react-app: server');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://localhost/react';
mongoose.connect(MONGODB_URI);

const catRouter = require('./route/cat-route.js');
app.use(cors);
app.use(morgan('dev'));
app.use(catRouter);

app.listen(PORT, () => {
  debug('Server Active On Port: ', PORT);
});
