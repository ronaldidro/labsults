import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { FIND_PERSON } from '../apollo/queries'
import Person from './Person'

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch
  })

  if (nameToSearch && result.data)
    return <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
        </div>
      ))}
    </div>
  )
}

Persons.propTypes = {
  persons: PropTypes.array.isRequired
}

export default Persons
