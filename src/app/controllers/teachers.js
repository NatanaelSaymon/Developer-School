const db = require('../../config/db')
const Teacher = require('../models/Teacher')
const { age, date } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
  index(req, res){

    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)

    const params = {
      filter, 
      page,
      limit,
      offset,
      callback(teachers){
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }
        return res.render("teachers/index", { teachers, filter, pagination })
      }
    }

    Teacher.paginate(params)
    
    // if(filter){
    //   Teacher.findBy(filter, function(teachers){
    //     return res.render("teachers/index", { teachers, filter })
    //   })
    // }
    // else{
    //   Teacher.all(function(teachers){
    //     return res.render("teachers/index", { teachers })
    //   })
    // }
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
    
    Teacher.create(req.body, function(teacher){
      res.redirect(`/teachers/${teacher.id}`)
    })
    
  },

  show(req, res){
    Teacher.find(req.params.id, function(teacher){
      if(!teacher){
        return res.send("Professor não encontrado, tente novamente!")
      }

      teacher.age = age(teacher.birth)
      teacher.services = teacher.services.split(",")
      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/show", { teacher })
    })
  },

  edit(req, res){
    Teacher.find(req.params.id, function(teacher){
      if(!teacher){
        return res.send("Professor não encontrado, tente novamente!")
      }

      teacher.birth = date(teacher.birth).iso

      return res.render("teachers/edit", { teacher })
    })
  },

  put(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){
      if(req.body[key] == ""){
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    Teacher.update(req.body, function(){
      return res.redirect(`/teachers/${req.body.id}`)
    })
  },

  delete(req, res){
    Teacher.delete(req.body.id, function(){
      return res.redirect('/teachers')
    })
  }
}



