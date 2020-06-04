const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

// INDEX
exports.index = function(req, res){
  return res.render('instructors/index', { instructors: data.instructors })
}

// CREATE
exports.create = function(req, res){
  return res.render('instructors/create')
}

// POST
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor, preencha todos os campos!")
    }
  }
  
  let { avatar_url, name, birth, services, gender } = req.body
  
  birth = Date.parse(req.body.birth)
  
  let id = 1 
  const lastId = data.instructors[data.instructors.length - 1]
  if(lastId){
    id = lastId.id + 1
  }
  
  const created_at = Date.now() //cria uma data no momento em que está sendo salvo.
  
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  }) //adiciona objetos no data.JSON

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Erro de escrita!")
    }
    return res.redirect("/instructors")
  })
  
}

// SHOW
exports.show = function(req, res){
  const { id } = req.params //desestruturando: retirando o ID de req.params e fazendo que seja uma variavel.

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!foundInstructor){
    return res.send('Instrutor não encontrado, por favor, tente novamente!')
  }
  
  //Ajustando os dados
  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
  }

  return res.render("instructors/show", { instructor })

}

// EDIT
exports.edit = function(req, res){
  const { id } = req.params 

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if(!foundInstructor){
    return res.send('Instrutor não encontrado, por favor, tente novamente!')
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso
  }

  return res.render('instructors/edit', { instructor })
}

// PUT
exports.put = function(req, res){

  const { id } = req.body
  let index = 0
  
  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if(id == instructor.id){
      index = foundIndex
      return true
    }
  })

  if(!foundInstructor){
    return res.send('Instrutor não encontrado, por favor, tente novamente!')
  }

  const instructor = {
    ...foundInstructor, //espalhando tudo que vinheram do instructor
    ...req.body, //espalhando tudo que foi trazido pelo req.body
    birth: Date.parse(req.body.birth), //data de aniversario
    id: Number(req.body.id) //Transforma todo ID em numero
  }

  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect(`/instructors/${id}`)
  })

}

// DELETE
exports.delete = function(req, res){
  const { id } = req.body

  //Filter = metodo que filtra as informações
  const filterdInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  })

  data.instructors = filterdInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect('/instructors')
  })
}



