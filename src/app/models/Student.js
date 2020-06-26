const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM students ORDER BY name ASC`, function(err, results){
      if(err){
        throw `Database Error! ${err}`
      }

      callback(results.rows)
    })
  },

  create(data, callback){
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth,
        gender,
        grade_school,
        workload,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.gender,
      data.grade_school,
      data.workload,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database Error, ${err}`
      }

      callback(results.rows)
    })
  },

  find(id, callback){
    db.query(`SELECT * FROM students WHERE id = $1`, [id], function(err, results){
      if(err){
        throw `Database Error, ${err}`
      }

      callback(results.rows[0])
    })
  },

  update(data, callback){
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        birth=($4),
        gender=($5),
        grade_school=($6),
        workload=($7)
      WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.gender,
      data.grade_school,
      data.workload,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database error: ${err}`
      }

      callback()
    })
  },

  delete(id, callback){
    db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
      if(err){
        throw `Database error: ${err}`
      }

      return callback()
    })
  }
}