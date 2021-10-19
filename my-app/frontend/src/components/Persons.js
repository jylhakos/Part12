import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {

  return (  
    <div>
      <ul>
        { persons.map(person => <Person key={person.id} person={person.name} phone={person.phone}/> )}
      </ul>
    </div>
          )

}

export default Persons