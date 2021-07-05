'use strict';
const faker = require("faker")
module.exports = {
  up: async (queryInterface,Sequelize) => {
    var newUsers = [];
    var newTags = [];
    for (let i = 0; i < 19; i++) {
      let Date = faker.date.between('2000-01-01','2021-01-01');
      let seedData = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
        role: faker.name.jobTitle(),
        createdAt: Date,
        updatedAt: Date
      };
      newUsers.push(seedData);
    }
    for (let j = 0; j < 10; j++) {
      let seedData = {
        name: faker.lorem.words(3),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      newTags.push(seedData);
    }
    queryInterface.bulkInsert('Users',newUsers);
    //queryInterface.bulkInsert('Tags',newTags);

    //j'ai pas compris la dernier Question !
  },

  down: async (queryInterface,Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
