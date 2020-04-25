module.exports = {
  //Logica da data
  age: function(timestamp){
    const today = new Date() //data de hoje
    const birthDate = new Date(timestamp) //data do aniversario da pessoa
  
    let age = today.getFullYear() - birthDate.getFullYear()
  
    const month = today.getMonth() - birthDate.getMonth()
  
    today.getDate()
    birthDate.getDate()
  
    if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
      age = age - 1
    }
  
    return age
  },

  date: function(timestamp){

    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
  }
}