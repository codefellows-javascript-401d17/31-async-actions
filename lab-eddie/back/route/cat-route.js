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

catRouter.get('/api/category/', function(req, res, next) {
  debug('GET /api/category');

  Category.find({})
  .then(category => res.json(category))
  .catch(err => next(createError(404, err)));
});

catRouter.put('/api/category/:id', jsonParser, function(req, res, next) {
  debug('PUT /api/category/id');

  Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(category => res.json(category))
  .catch(err => next(createError(404, err)));
});

catRouter.delete('/api/category/:id', function(req, res, next) {
  debug('DELETE /api/category/id');

  Category.findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204);
    res.send({});
  })
  .catch(err => next(createError(404, err)));
});
