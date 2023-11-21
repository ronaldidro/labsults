import PropTypes from 'prop-types'

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

Person.propTypes = {
  person: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Person
