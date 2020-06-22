const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

// INDEX
exports.index = function(req, res){
  return res.render('students/index', { students: data.students })
}

// CREATE
exports.create = function(req, res){
  return res.render('students/create')
}


// POST
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor, preencha todos os campos!")
    }
  }
  
  birth = Date.parse(req.body.birth)
  
  let id = 1
  const laststudent = data.students[data.students.length - 1]
  if(laststudent){
    id = laststudent.id + 1
  }

  data.students.push({
    id,
    ...req.body,
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Erro de escrita!")
    }
    return res.redirect("/students")
  })
  
}

// SHOW
exports.show = function(req, res){
  const { id } = req.params //desestruturando: retirando o ID de req.params e fazendo que seja uma variavel.

  const foundstudent = data.students.find(function(student){
    return student.id == id
  })

  if(!foundstudent){
    return res.send('Student not found!')
  }
  
  //Ajustando os dados
  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).birthDay
  }

  return res.render("students/show", { student })

}

// EDIT
exports.edit = function(req, res){
  const { id } = req.params 

  const foundstudent = data.students.find(function(student){
    return student.id == id
  })

  if(!foundstudent){
    return res.send('Student not found!')
  }

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).iso
  }

  return res.render('students/edit', { student })
}

// PUT
exports.put = function(req, res){

  const { id } = req.body
  let index = 0
  
  const foundstudent = data.students.find(function(student, foundIndex){
    if(id == student.id){
      index = foundIndex
      return true
    }
  })

  if(!foundstudent){
    return res.send('Student not found!')
  }

  const student = {
    ...foundstudent, //espalhando tudo que vinheram do student
    ...req.body, //espalhando tudo que foi trazido pelo req.body
    birth: Date.parse(req.body.birth), //data de aniversario
    id: Number(req.body.id) //Transforma todo ID em numero
  }

  data.students[index] = student

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect(`/students/${id}`)
  })

}

// DELETE
exports.delete = function(req, res){
  const { id } = req.body

  //Filter = metodo que filtra as informações
  const filterdstudents = data.students.filter(function(student){
    return student.id != id
  })

  data.students = filterdstudents

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect('/students')
  })
}



