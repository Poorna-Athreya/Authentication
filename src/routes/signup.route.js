const express = require('express');
const handlers = require('../handlers/auth.handler');

const signupRoute = express.Router();
signupRoute.post('/', handlers.signupHandler);

module.exports = {
  signupRoute,
};
