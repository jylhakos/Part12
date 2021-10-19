// 3.22 
// $ npm install eslint --save-dev
// $ node_modules/.bin/eslint index.js

//12.21
// $ npm install --save morgan

const express = require('express')
const app = express()

// 3.9
const cors = require('cors')
//$ npm install cors

// 3.13
// $ npm install dotenv
require('dotenv').config()

// 3.13
const Person = require('./models/db')

// 3.13, 3.14, 3.15
app.use(express.static('build'))

// 3.15
app.use(express.json())

// 3.16, 3.19
const errorHandler = (error, request, response, next) => {

  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('ValidationError', error.message)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// 3.7, 3.8
const morgan = require('morgan')
var fs = require('fs');

// 3.7
var stream_3_7 = fs.createWriteStream(__dirname + '/3.7.log',{flags: 'a'});

// 3.8
var stream_3_8 = fs.createWriteStream(__dirname + '/3.8.log',{flags: 'a'});

// 3.8
morgan.token('body', function getBody (request, response) {
  console.log(response)
  if (request.method == 'POST') { return JSON.stringify(request.body) }
})

// 3.7
app.use(morgan('tiny', {stream: stream_3_7}));

// 3.8
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  stream: stream_3_8,
  //skip: function (req, res) { return req.method != 'POST' }
}))

app.use(express.json())

app.use(cors())

// 3.13
var persons = []

// 3.1, 3.2, 3.3
/*let persons = [
    {
      "name": "Arto Hellas",
      "phone": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "phone": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "phone": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "phone": "39-23-6423122",
      "id": 4
    }
  ] */

var persons_length = persons.length

// 3.5
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 3.5
const generateId = () => {
  const max = 8589934592
  const min = persons.length
  //const min = persons.length > 0
  //  ? Math.max(...persons.map(n => n.id))
  //  : 0console.log('id', id)
  console.log('min', min)

  var id = getRandomInt(min,max)

  console.log('id', id)

  return id
}

// 3.6
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// 3.6
function isKeyEmpty(key) {
  return (key === undefined || key == null || key.length <= 0) ? true : false;
}

function hasKeyValue(obj, value) {
  console.log('obj', obj)
  console.log('value', value)
  
  for (var i=0; i < obj.length; i++) {
    console.log('obj[i].name]', obj[i].name)
    if(obj[i].name == value) {
      console.log('return', true)
      return true
    }
  }
  console.log('return', false)
  return false
}

function checkValidity(request, response) {

  const content = request.body

  console.log('checkValidity', content)

  if(isObjectEmpty(content)) {
    console.log('error: content is empty')
    return response.status(400).json({
    status: 'error',
    error: 'error: request content is empty',
  })} else if (content.hasOwnProperty('name') === false) {
    console.log('error: has not name')
    return response.status(400).json({error: 'error: has not name'})
  } else if (isKeyEmpty(content.name)) {
    console.log('error: name is empty')
    return response.status(400).json({
      status: 'error',
      error: 'error: name is empty'})
  } else if (content.hasOwnProperty('phone') === false) {
    console.log('error: has not phone')
    return response.status(400).json({error: 'error: has not phone'})
  } else if (isKeyEmpty(content.phone)) {
    console.log('error: phone is empty')
    return response.status(400).json({
      status: 'error',
      error: 'error: phone is empty'})
  } else {
    console.log('content.name', content.name)

    const exists = hasKeyValue(persons,content.name)

    console.log('exists', exists)

    if (exists) {
      console.log('error: name must be unique')
      return response.status(400).json({ 
        status: 'error',
        error: 'error: name must be unique'})
    }
  }

  return null
}

// 3.0
app.get('/', (request, response) => {
  response.send('<h1></h1>')
})

// 3.13
// $ curl -X "GET" http://localhost:3001/api/persons

// 3.1
app.get('/api/persons', (request, response) => {
  console.log('/api/persons', request.body)
  // 3.13
  Person.find({})
  .then(persons => {
    persons_length = persons.length
    console.log('persons_length', persons_length)
    response.json(persons)
  })

  // 3.1
  //return response.json(persons)
})

// 3.2
app.get('/info', async (request, response) => {

  let dateTime = new Date();

  dateTime.toGMTString('en-US', { timeZone: 'Europe/Helsinki' });

  // 3.18
  await Person.find({})
  .then(persons => {
    persons_length = persons.length
    console.log('persons_length', persons_length)
  })

  let info = "<div>Phonebook has info for " + persons_length + " people</div>" + "<br>" + dateTime + "</br>"

  console.log(info)

  return response.send(info)

})

// $ curl -X "GET" "http://localhost:3001/api/persons/2"

// 3.3, 3.15
app.get('/api/persons/:id', (request, response, next) => {

  // 3.3
  //const id = Number(request.params.id)

  // 3.15
  const id = request.params.id

  console.log('GET', '/api/persons/' + id)
  
  // 3.3
  //const person = persons.find(person => person.id === id)
  
  //console.log(person)
  
  // 3.3
  //if (person) {

  //  response.json(person)

  //} else {

  //  response.status(404).end()

  //}

  // 3.15
  Person.findById(id)
    .then(person => {
      console.log(person)
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log("ERROR")
      next(error)
    })

})

// $ curl -X "DELETE" "http://localhost:3001/api/persons/2"

// 3.4, 3.15
app.delete('/api/persons/:id', (request, response, next) => {

  // 3.4
  //const id = Number(request.params.id)

  // 3.15
  const id = request.params.id

  console.log('DELETE', '/api/persons/' + id)

  // 3.4
  //const person = persons.filter(person => person.id === id)

  // 3.4
  //const index = persons.findIndex(function(person, i) {
  //  return person.id === id
  //});

  // console.log('person', person)

  // 3.4
  /*if (person) {

    persons.splice(index, 1);

    response.status(204).end()

  } else {

    response.status(404).end()

  }*/

  // 3.15
  Person.findByIdAndRemove(id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// $ curl -X "POST" http://localhost:3001/api/persons -H "Content-Type: application/json" -d "{\"name\":\"Jane Austin\", \"phone\":\"0123456789\"}"

// 3.5, 3.6, 3.19
app.post('/api/persons', (request, response, next) => {

  console.log('request.body', request.body)

  const content = request.body

  var result = null

  result = checkValidity(request,response)

  console.log('result', result)

  if (result == null) {

    // 3.1, 3.2, 3.3
    /*const person = {
      name: content.name,
      phone: content.phone,
      id: generateId(),
    }*/

    //3.22 
    const lint_person = {
      name: content.name,
      phone: content.phone,
      id: generateId(),
    }
    console.log(lint_person)

    // 3.14, 3.18
    const person = new Person({
      name: content.name,
      phone: content.phone,
    })

    persons = persons.concat(person)

    console.log(person)

    // 3.14, 3.18
    person.save().then(person => {

      console.log('person._id', person._id)

      person.id = person._id

      console.log('person', person)

      return response.json(person)
    })
    .catch(error => next(error))

    // 3.1, 3.2, 3.3
    //return response.json(person)
  }
})

// 3.17 
app.put('/api/persons/:id', (request, response, next) => {

  const id = request.params.id

  const content = request.body

  if (content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  console.log(content.name, content.phone, id)

  const person = {
      name: content.name,
      phone: content.phone,
    }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(person => {
      console.log('person', person)
      response.json(person)
    })
    .catch(error => next(error))
})

// $ curl -X "PUT" "http://localhost:3001/api/persons/60e14baef45d6a4712a8e018" -H "Content-Type: application/json" -d "{\"name\":\"Arto Hellas\", \"phone\":\"040-123456\"}"

// 3.16 
app.use(errorHandler)

// 3.1
//const PORT = 3001

//3.13 
//const PORT = process.env.PORT

// 3.21
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
