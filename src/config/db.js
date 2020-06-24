const { Pool } = require("pg")

module.exports = new Pool ({
  user: 'saymon',
  password: '22142203',
  host: 'localhost',
  port: '5432',
  database: 'developerSchool'
})