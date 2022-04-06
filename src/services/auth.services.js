const { Users } = require('../../models');
const AuthError = require('../errors/AuthError');
const utils = require('../utils/token');
const redis = require('../utils/redis.utils');
const utilServices = require('./service.utils');

const login = async (givenUsername, givenPassword) => {
  const user = await utilServices.findUser(givenUsername);
  if (user.length > 0) {
    if (givenPassword !== user[0].password) {
      throw new AuthError('Unauthorised', 'Password incorrect!', 401);
    }
    const token = utils.createToken(givenUsername);
    redis.setKey(token, givenUsername);
    return { user, token };
  }
  return { user: '' };
};

const signup = async (givenUsername, givenPassword) => {
  const existingUser = await utilServices.findUser(givenUsername);
  if (existingUser.length > 0) throw new AuthError('BadRequest', 'Invalid, this username already exists!', 400);
  await Users.create({
    username: givenUsername, password: givenPassword, createdAt: new Date(), updatedAt: new Date(),
  });
  return 'Successfully created new user!';
};

const validateToken = (token) => {
  const user = redis.getValue(token);
  return user;
};
module.exports = {
  login,
  validateToken,
  signup,
};
