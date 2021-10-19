import React from 'react'

const Person = ({ person, phone }) => {

  console.log('person', person, 'phone', phone)

  return ( 
      person != null ? ( <li>{person} {phone}</li> ) : null
      )
}

export default Person