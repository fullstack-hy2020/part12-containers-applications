const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 4 && process.argv.length > 5) {
  console.log('Please provide the name and the number as an argument: node mongo.js <password> [name person to Add] [number person to Add]')
  process.exit(1)
} 
const password = process.argv[2]

const url =
  `mongodb+srv://javierjxs20:${password}@cluster0.azeylml.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personsSchema)

if (process.argv.length === 3) {
  Person.find().then(result => {
    console.log('Phonebook:');
    result.forEach(person => {
      console.log(`${person.name + ' ' +person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    id: 1,
    name: process.argv[3],
    number: process.argv[4]
    
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })

}


  