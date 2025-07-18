'use strict';

const config = require('./config');
const services = require('./services');
const controllers = require('./controllers');
const routes = require('./routes');
const bootstrap = require('./bootstrap');

module.exports = {
  config,
  services,
  controllers,
  routes,
  bootstrap,
}; 