const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

const Intl = require('intl')

module.exports = {
  index(req, res){
    db.query(`SELECT * FROM teachers ORDER BY name ASC`, function(err, results){
      if(err){
        throw `Database Error ${err}`
      }

      return res.render('teachers/index', { teachers: results.rows })
    })
  },

  create(req, res){
    return res.render('teachers/create')
  },

  post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }
    
    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        nivel,
        typeclass,
        services,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.nivel,
      req.body.typeclass,
      req.body.services,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
      if(err){
        throw `Database Erro ${err}`
      }

      return res.redirect(`/teachers/${results.rows[0].id}`)
    })

  },

  show(req, res){
    return
  },

  edit(req, res){
    return
  },

  put(req, res){
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }
  },

  delete(req, res){
    return
  }
} 

// // INDEX
// exports.index = function(req, res){
//   return res.render('teachers/index', { teachers: data.teachers })
// }

// // CREATE
// exports.create = function(req, res){
//   return res.render('teachers/create')
// }

// // POST
// exports.post = function(req, res){
//   const keys = Object.keys(req.body)

//   for(key of keys){
//     if(req.body[key] == ""){
//       return res.send("Por favor, preencha todos os campos!")
//     }
//   }
  
//   let { avatar_url, name, birth, services, typeclass, nivel } = req.body
//   birth = Date.parse(req.body.birth)
  
//   let id = 1 
//   const lastId = data.teachers[data.teachers.length - 1]
//   if(lastId){
//     id = lastId.id + 1
//   }
  
//   const created_at = Date.now() //cria uma data no momento em que está sendo salvo.
  
//   data.teachers.push({id, avatar_url, name, birth, nivel, typeclass, services, created_at}) //adiciona objetos no data.JSON

//   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//     if(err){
//       return res.send("Erro de escrita!")
//     }
//     return res.redirect("/teachers")
//   })
  
// }

// // SHOW
// exports.show = function(req, res){
//   const { id } = req.params //desestruturando: retirando o ID de req.params e fazendo que seja uma variavel.

//   const foundteacher = data.teachers.find(function(teacher){
//     return teacher.id == id
//   })

//   if(!foundteacher){
//     return res.send('Teacher not found!')
//   }
  
//   //Ajustando os dados
//   const teacher = {
//     ...foundteacher,
//     age: age(foundteacher.birth),
//     services: foundteacher.services.split(","),
//     created_at: new Intl.DateTimeFormat('pt-BR').format(foundteacher.created_at)
//   }

//   return res.render("teachers/show", { teacher })

// }

// // EDIT
// exports.edit = function(req, res){
//   const { id } = req.params 

//   const foundteacher = data.teachers.find(function(teacher){
//     return teacher.id == id
//   })

//   if(!foundteacher){
//     return res.send('Teacher not found!')
//   }

//   const teacher = {
//     ...foundteacher,
//     birth: date(foundteacher.birth).iso
//   }

//   return res.render('teachers/edit', { teacher })
// }

// // PUT
// exports.put = function(req, res){

//   const { id } = req.body
//   let index = 0
  
//   const foundteacher = data.teachers.find(function(teacher, foundIndex){
//     if(id == teacher.id){
//       index = foundIndex
//       return true
//     }
//   })

//   if(!foundteacher){
//     return res.send('Teacher not found!')
//   }

//   const teacher = {
//     ...foundteacher, //espalhando tudo que vinheram do teacher
//     ...req.body, //espalhando tudo que foi trazido pelo req.body
//     birth: Date.parse(req.body.birth), //data de aniversario
//     id: Number(req.body.id) //Transforma todo ID em numero
//   }

//   data.teachers[index] = teacher

//   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//     if(err){
//       return res.send("Escrita Errada!")
//     }
//     return res.redirect(`/teachers/${id}`)
//   })

// }

// // DELETE
// exports.delete = function(req, res){
//   const { id } = req.body

//   //Filter = metodo que filtra as informações
//   const filterdteachers = data.teachers.filter(function(teacher){
//     return teacher.id != id
//   })

//   data.teachers = filterdteachers

//   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//     if(err){
//       return res.send("Escrita Errada!")
//     }
//     return res.redirect('/teachers')
//   })
// }



