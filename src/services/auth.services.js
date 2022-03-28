/* eslint-disable no-return-await */
const { Users } = require('../../models');

const authentication = async (givenUsername, givenPassword) => await Users.findAll({
  attributes: ['username', 'password'],
  where: {
    username: givenUsername,
    password: givenPassword,
  },
});

module.exports = {
  authentication,
};
