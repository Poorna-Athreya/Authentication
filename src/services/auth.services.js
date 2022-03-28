/* eslint-disable no-return-await */
const { Users } = require('../../models');
const AuthError = require('../errors/AuthError');

const authentication = async (givenUsername, givenPassword) => {
  let result = await Users.findAll({
    attributes: ['username', 'password'],
    where: {
      username: givenUsername,
      password: givenPassword,
    },
  });
  if (result.length === 0) {
    result = await Users.findAll({
      attributes: ['username', 'password'],
      where: {
        username: givenUsername,
      },
    });
    if (result.length === 0) return result;
    console.log('Given password: ', givenPassword, 'Password : ', result[0].password);
    if (givenPassword !== result[0].password) throw new AuthError('Unauthorised', 'Password incorrect!', 401);
  }
  return result;
};

module.exports = {
  authentication,
};
