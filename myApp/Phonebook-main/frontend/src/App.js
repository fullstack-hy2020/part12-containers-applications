import React, { useState, useEffect } from 'react'
import personService from './services/phonebook'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (e) => {
    if (window.confirm(`Delete ${e.name}?`)) {
      personService
        .remove(e.id)
        .then((_response) => {
          setPersons(persons.filter((item) => item.id !== e.id))
          setAlertMessage(`${e.name} has been removed`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(`Something go wrong`)
          console.log(error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const alreadyAdded = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    )
    if (alreadyAdded) {
      if (
        window.confirm(
          `${newName} is already added tho phonebook, replace the old number with a new one?`,
        )
      ) {
        const ids = persons.map((item) => item.id)
        const indexNew = ids.indexOf(alreadyAdded.id)
        personService
          .update(alreadyAdded.id, {
            name: alreadyAdded.name,
            number: newNumber,
          })
          .then((response) => {
            console.log(response)
            const copyPersons = persons.toSpliced(indexNew, 1, response)
            console.log(copyPersons)
            setPersons(copyPersons)
            setNewFilter('')
            setNewName('')
            setNewNumber('')
            setAlertMessage(`${response.name} number changed`)
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000)
          })
          .catch((_error) => {
            setErrorMessage(
              `Information of '${alreadyAdded.name}' has already been removed from server`,
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const name = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(name)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewFilter('')
          setNewName('')
          setNewNumber('')
          setAlertMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const setStyle = {
    color: 'red',
  }

  const byFilterField = (p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter ? persons.filter(byFilterField) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <Notification message={errorMessage} style={setStyle} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
