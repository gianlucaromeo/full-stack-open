const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://gianlucaromeo:${password}@cluster0.bggve.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

// The schema defines the structure of the documents that are stored in the 
// database.
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

// The model is a constructor function that we use to create individual 
// documents.
const Note = mongoose.model('Note', noteSchema)

// The document is an instance of the model, and it represents an individual 
// document in the database.
const note = new Note({
    content: 'Java is nice',
    important: true,
})

// Learning purpose only:
const findNotes = true  // Set to false to save a new note

if (findNotes) {
    // Set important to true or false to filter notes
    Note.find({important: true}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
} else {
    note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
   })
}