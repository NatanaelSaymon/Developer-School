const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

// INDEX
exports.index = function(req, res){
  return res.render('members/index', { members: data.members })
}

// CREATE
exports.create = function(req, res){
  return res.render('members/create')
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
  const lastMember = data.members[data.members.length - 1]
  if(lastMember){
    id = lastMember.id + 1
  }

  data.members.push({
    id,
    ...req.body,
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Erro de escrita!")
    }
    return res.redirect("/members")
  })
  
}

// SHOW
exports.show = function(req, res){
  const { id } = req.params //desestruturando: retirando o ID de req.params e fazendo que seja uma variavel.

  const foundMember = data.members.find(function(member){
    return member.id == id
  })

  if(!foundMember){
    return res.send('Membro não encontrado, por favor, tente novamente!')
  }
  
  //Ajustando os dados
  const member = {
    ...foundMember,
    age: age(foundMember.birth)
  }

  return res.render("members/show", { member })

}

// EDIT
exports.edit = function(req, res){
  const { id } = req.params 

  const foundMember = data.members.find(function(member){
    return member.id == id
  })

  if(!foundMember){
    return res.send('Membro não encontrado, por favor, tente novamente!')
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth)
  }

  return res.render('members/edit', { member })
}

// PUT
exports.put = function(req, res){

  const { id } = req.body
  let index = 0
  
  const foundMember = data.members.find(function(member, foundIndex){
    if(id == member.id){
      index = foundIndex
      return true
    }
  })

  if(!foundMember){
    return res.send('Membro não encontrado, por favor, tente novamente!')
  }

  const member = {
    ...foundMember, //espalhando tudo que vinheram do member
    ...req.body, //espalhando tudo que foi trazido pelo req.body
    birth: Date.parse(req.body.birth), //data de aniversario
    id: Number(req.body.id) //Transforma todo ID em numero
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect(`/members/${id}`)
  })

}

// DELETE
exports.delete = function(req, res){
  const { id } = req.body

  //Filter = metodo que filtra as informações
  const filterdMembers = data.members.filter(function(member){
    return member.id != id
  })

  data.members = filterdMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Escrita Errada!")
    }
    return res.redirect('/members')
  })
}



