// Run with: node mongo.js <password> <name> <number>

const mongoose = require('mongoose')

const onlyPasswordProvided = process.argv.length == 3
const tooFewArguments = process.argv.length < 5
const tooManyArguments = process.argv.length > 5

if (!onlyPasswordProvided && (tooFewArguments || tooManyArguments)) {
    console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://gianlucaromeo:${password}@cluster0.bggve.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (onlyPasswordProvided) {
    showAll().then(() => {
        mongoose.connection.close()
    })
    return
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    addNew(name, number).then(() => {
        mongoose.connection.close()
    })
}


async function showAll() {
    const result_1 = await Person.find({})
    console.log('phonebook:')
    result_1.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
}

async function addNew(name, number) {
    const person = new Person({
        name: name,
        number: number,
    })

    const result = await person.save()
    console.log(`added ${name} number ${number} to phonebook`)
}