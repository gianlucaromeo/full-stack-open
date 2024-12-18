import { useState, useEffect } from 'react'

import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

import phonebookService from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newName)

    if (personExists) {

      const confirmationText = `${newName} is already added to the phonebook, replace the old number with a new one?`

      if (window.confirm(confirmationText)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        phonebookService
          .updateNumber(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id
              ? person
              : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            console.log(error.response.data)
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }

      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    phonebookService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const deletePerson = (id) => {
    phonebookService
      .deletePerson(id)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setSuccessMessage(`Deleted ${persons.find(person => person.id === id).name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`${persons.find(person => person.id === id).name} was already deleted from the server`)
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  )
}

export default App