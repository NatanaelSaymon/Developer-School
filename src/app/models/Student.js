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
        created_at,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      date(Date.now()).iso,
      data.teacher
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database Error, ${err}`
      }

      callback(results.rows[0])
    })
  },

  find(id, callback){
    db.query(`
      SELECT students.*, teachers.name AS teacher_name 
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
      WHERE students.id = $1`, [id], function(err, results){
      if(err){
        throw `Database Error, ${err}`
      }

      callback(results.rows[0])
    })
  },

  findBy(filter, callback){
    db.query(`
      SELECT * 
      FROM students
      WHERE students.name ILIKE '%${filter}%'
      ORDER BY name ASC`, function(err, results){
      if(err){
        throw `Database Error! ${err}`
      }

      callback(results.rows)
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
        workload=($7),
        teacher_id=($8)
      WHERE id = $9
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.gender,
      data.grade_school,
      data.workload,
      data.teacher,
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
  },

  teacherSelectOptions(callback){
    db.query(`SELECT name, id FROM teachers`, function(err, results){
      if(err){
        throw `Database error: ${err}`
      }

      callback(results.rows)
    })
  },

  paginate(params){
    const { filter, limit, offset, callback } = params

    let query = ""
    let filterQuery = ""
    let totalQuery = `(SELECT count(*) FROM students) AS total`

    if(filter){
      filterQuery = 
      `WHERE students.name ILIKE '%${filter}%'
      OR students.email ILIKE '%${filter}%'`

      totalQuery = `(SELECT count(*) FROM students ${filterQuery}) AS total` 
    }

    query = `SELECT students.*, ${totalQuery}
    FROM students
    ${filterQuery}
    ORDER BY name ASC LIMIT ${limit} OFFSET ${offset}`

    db.query(query, function(err, results){
      if(err){
        throw `Database error: ${err}`
      }
      callback(results.rows)
    })
  }
}