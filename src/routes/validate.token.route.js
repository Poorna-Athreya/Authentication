const express = require('express');
const handlers = require('../handlers/auth.handler');

const validateTokenRoute = express.Router();
validateTokenRoute.get('/', handlers.validateToken);

module.exports = {
  validateTokenRoute,
};
