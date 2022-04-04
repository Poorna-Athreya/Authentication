const { Users } = require('../../models');
const AuthError = require('../errors/AuthError');
const utils = require('../utils/token');
const redis = require('../utils/redis.utils');
// const utilServices = require('./service.utils');

// const login = async (givenUsername, givenPassword) => {
//   let result = await Users.findAll({
//     attributes: ['username', 'password'],
//     where: {
//       username: givenUsername,
//     },
//   });
//   if (givenPassword !== result[0].password) {
//       throw new AuthError('Unauthorised', 'Password incorrect!', 401);
//     }
//   }
//   return result;
// };

const login = async (givenUsername, givenPassword) => {
  const result = await Users.findAll({
    attributes: ['username', 'password'],
    where: {
      username: givenUsername,
    },
  });
  if (result.length === 0) {
    const [user, created] = await Users.findOrCreate({
      where: {
        username: givenUsername,
        password: givenPassword,
      },
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    });
    if (created) return `New user ${user.username} Created!`;
    return user;
  }
  if (givenPassword !== result[0].password) {
    throw new AuthError('Unauthorised', 'Password incorrect!', 401);
  }
  const token = utils.createToken(givenUsername);
  redis.setKey(token, givenUsername);
  return { result, token };
};

// const signup = async (givenUsername, givenPassword) => {
//   const existingUsers = await utilServices.getAllUsers();
//   existingUsers.forEach((user) => {
//     if (user.username === givenUsername)
// throw new AuthError('BadRequest', 'Invalid, this username already exists!', 400);
//   });
// };

const validateToken = (token) => {
  const user = redis.getValue(token);
  return user;
};
module.exports = {
  login,
  validateToken,
  // signup,
};
