module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Poorna',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'CynthiaErivo',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'A_Chase',
        password: 'Wisegirl',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('Users', { username: { [Op.in]: ['Poorna', 'CynthiaErivo', 'A_Chase'] } }, {});
  },
};
