'use strict';

const Router = require('express').Router;
const debug = require('debug')('react-app: category router');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Category = require('../model/category.js');
const catRouter = module.exports = new Router();

catRouter.post('/api/category', jsonParser, function(req, res, next) {
  debug('POST /api/category');

  new Category(req.body).save()
  .then(category => res.json(category))
  .catch(err => next(createError(400, err)));
});
