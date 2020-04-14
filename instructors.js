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

  data.instructors.push(req.body) //adiciona objetos no data.JSON

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