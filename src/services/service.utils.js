const { Users } = require('../../models');

const getAllUsers = async () => Users.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } });
const findUser = async (givenUsername) => {
  const user = await Users.findAll({
    attributes: ['username', 'password'],
    where: {
      username: givenUsername,
    },
  });
  return user;
};

module.exports = {
  getAllUsers,
  findUser,
};
