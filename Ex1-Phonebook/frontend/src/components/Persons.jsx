const Persons = ({persons, handleDelete}) => 
  <>
    {persons.map(person => {
      return (
        <p key = {person.name}>
          {person.name} {person.number}
          <button onClick = {() => {handleDelete(person.id)}}>delete</button>
        </p>
      )
    })}
  </>
export default Persons