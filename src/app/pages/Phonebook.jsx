import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { ALL_PERSONS, PERSON_ADDED } from '../apollo/queries'
import LoginPersonForm from '../components/LoginPersonForm'
import Notify from '../components/Notify'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import PhoneForm from '../components/PhoneForm'

const updateCache = (cache, query, addedPerson) => {
  const uniqByName = a => {
    let seen = new Set() //eslint-disable-line
    return a.filter(item => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    }
  })
}

const Phonebook = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading) return <div>loading...</div>

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginPersonForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default Phonebook
