import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import Notification from './components/Notification'
import ErrorMessage from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    const personExist = persons.find(person => person.name === newName)
    if(personExist){
      if(window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)){
        const personData = {...personExist, number: newNumber}
        personService
          .putPerson(personData)
          .then(returnedData => {
            setPersons(persons.map(person => person.id === returnedData.id ? returnedData : person))
            setNotification(`Modified ${returnedData.name}'s number`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .postPerson(newPerson)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNotification(`Added ${returnedData.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterValueChange = (event) =>{
    setFilterValue(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  )

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedData => {
          setPersons(persons.filter(person => person.id !== returnedData.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messeage = {notification}/>
      <ErrorMessage errorMesseage={errorMessage}/>
      <Filter filterValue = {filterValue} handleFilterValueChange = {handleFilterValueChange} />

      <h3>add a new</h3>
      <PersonForm 
        newName = {newName} 
        handleNameChange = {handleNameChange} 
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
        handleClick = {handleClick}
      />

      <h3>Numbers</h3>
      <Persons persons = {personsToShow} handleDelete = {handleDelete} />
    </div>
  )
}

export default App