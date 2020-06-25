const db = require('../../config/db')
const date = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM students ORDER BY name ASC`, function(err, results){
      if(err){
        throw `Database Error! ${err}`
      }

      callback(results.rows)
    })
  }
}