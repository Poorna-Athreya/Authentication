const express = require('express');
const handlers = require('../handlers/auth.handler');

const authRoute = express.Router();
authRoute.get('/', handlers.authHandler);

module.exports = {
  authRoute,
};
