require('dotenv').config()

const express = require('express')
const cors = require('cors')

const Note = require('./models/note')

const app = express()


app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.use(cors())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    // Notice that the findByIdAndUpdate method receives a regular JavaScript 
    // object as its argument, and not a new note object created with the Note 
    // constructor function.
    const note = {
        content: body.content,
        important: body.important,
    }

    // The { new: true } option in the findByIdAndUpdate method makes sure that
    // the event handler receives the updated document as its argument.
    // Otherwise, the event handler would receive the original document that was
    // updated.
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// This has to be the last loaded middleware, also all the routes should be 
// registered before this.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})