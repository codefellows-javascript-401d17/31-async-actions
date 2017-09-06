'use strict';

const debug = require('debug')('react-app: category model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  budget: {type: Number, required: true},
  title: {type: String, required: true},
  published: {type: Date, required: true, default: Date.now}
});

const Category = module.exports = mongoose.model('category', categorySchema);
