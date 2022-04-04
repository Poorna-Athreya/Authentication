const { Users } = require('../../models');

const getAllUsers = async () => Users.findAll({ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } });

module.exports = {
  getAllUsers,
};
