const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const expresion = /^\d{3}-?\d{5}\d*$/

const personSchema = new mongoose.Schema({
    name: {
      type: String, required: true, unique: true, minlength: 3
    },
    number: {
      type: String, require: true, validate: expresion
    },
    id: {
      type: String
    },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)