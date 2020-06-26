const db = require('../../config/db')
const Student = require('../models/Student')
const { age, date } = require('../../lib/utils')

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

    Student.create(req.body, function(student){
      res.redirect(`/students/${student.id}`)
    })

  },

  show(req, res){
    Student.find(req.params.id, function(student){
      if(!student){
        return res.send("Aluno não encontrado, tente novamente!")
      }

      student.birth = date(student.birth).birthDay
      student.created_at = date(student.created_at).format

      return res.render("students/show", { student })
    })
  },

  edit(req, res){
    Student.find(req.params.id, function(student){
      if(!student){
        return res.send("Aluno não encontrado, tente novamente!")
      }

      student.birth = date(student.birth).iso
      
      return res.render("students/edit", { student })
    })
  },

  put(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    Student.update(req.body, function(){
      return res.redirect(`/students/${req.body.id}`)
    })
  },

  delete(req, res){
    Student.delete(req.body.id, function(){
      return res.redirect('/students')
    })
  }
}



