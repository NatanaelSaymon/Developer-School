const db = require('../../config/db')
const Student = require('../models/Student')
const { date } = require('../../lib/utils')

module.exports = {
  index(req, res){
    Student.all(function(students){
      return res.render('students/index', { students })
    })
  },
  
  create(req, res){
    return res.render('students/create')
  },

  post(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }

  },

  show(req, res){
    return
  },

  edit(req, res){
    return
  },

  put(req, res){
    const keys = Object.keys(req.body)

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



