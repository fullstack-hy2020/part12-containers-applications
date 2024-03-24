const Persons = ({persons, deletePerson}) => {
    return (
      <div>
        { persons.map(item => <h4 key={item?.id}>{item?.name} {item?.number} <button onClick={() => deletePerson(item)}>Delete</button></h4>)}
      </div>
    )
  }
  
  export default Persons