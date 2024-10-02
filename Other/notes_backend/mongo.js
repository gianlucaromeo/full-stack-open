require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)

const Note = require('./models/note')

const note = new Note({
  content: 'Java is super hard!!',
  date: new Date(),
  important: false,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})