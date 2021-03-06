const express = require('express');
const handlers = require('../handlers/auth.handler');

const loginRoute = express.Router();
loginRoute.post('/', handlers.loginHandler);

module.exports = {
  loginRoute,
};
