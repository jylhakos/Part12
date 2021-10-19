// 3.12
// https://www.mongodb.com/cloud/atlas

// 3.12
// $ node mongo.js password Anna 040-1234556

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = 'fullstack' // process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

console.log('name', name, 'phone', phone)

const url = "mongodb+srv://fullstack:" + password + "@cluster3-13.pmolw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
// const url = `mongodb+srv://fullstack:<password>@cluster3-13.pmolw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  phone: phone,
})

person.save().then(result => {
  console.log('added', name, 'number', phone, 'to phonebook')
  mongoose.connection.close()
})

Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(person.name, person.phone)
  })
  mongoose.connection.close()
})
