const fs = require('fs')
const data = require('./data.json')

//creat
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor, preencha todos os campos!")
    }
  }
  
  let {avatar_url, name, birth, services, gender } = req.body

  birth = Date.parse(req.body.birth)
  const id = Number(data.instructors.length + 1)
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
  //return res.send(req.body)
}

//update

//delete