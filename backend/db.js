const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movie_db', 'root', 'Navgurukul@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
