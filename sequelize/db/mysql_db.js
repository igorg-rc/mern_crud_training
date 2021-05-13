const Sequelize = require('sequelize')
const keys = require('../../config/keys')

const db = new Sequelize(
  keys.SEQUELIZE_DB, keys.SEQUELIZE_USER, keys.SEQUELIZE_PASSWORD,  {
    host: keys.SEQUELIZE_HOST,
    dialect: keys.SEQUELIZE_DIALECT
  }
)

module.exports = db