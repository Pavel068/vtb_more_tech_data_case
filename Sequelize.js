const Sequelize = require('sequelize')

// noinspection JSValidateTypes
module.exports = new Sequelize({
	host: process.env.MYSQL_HOST,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB_NAME,
	dialect: 'mysql'
})