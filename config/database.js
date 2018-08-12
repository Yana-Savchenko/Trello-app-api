const Sequelize = require('sequelize');
const connection = require('./connection');

const database = new Sequelize(
    connection.database,
    connection.username,
    connection.password, 
    {
      host: connection.host,
      port: connection.port,
      dialect: connection.dialect,
    }
);
database
    .authenticate()
    .then(() => {
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

module.exports = database;