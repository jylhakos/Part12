import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newPhone, handlePhoneChange }) => {

  return ( 
  	<form onSubmit={addPerson}>
      <div>
        <div>
          <label>Name: </label><input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <label>Phone: </label><input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        
        </div>
        <div><button type="submit">Add</button></div>
      </form>
    )
}

export default PersonForm
