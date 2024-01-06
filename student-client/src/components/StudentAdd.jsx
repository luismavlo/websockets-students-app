import PropTypes from "prop-types";
import {useState} from "react";

export const StudentAdd = ({ addStudent }) => {

    const [value, setValue] = useState('')

    const submit = (e) => {
        e.preventDefault();

        if(value.trim().length === 0){
            alert("No seas pendejo we, llena algo")
            return;
        }

        addStudent(value)
    }

  return (
    <>
      <h3>Agregar Estudiante</h3>

      <form onSubmit={submit}>
        <input type="text" onChange={(e) => setValue(e.target.value)} className="form-control" placeholder="Ingresar Nombre del estudiante"  required/>
      </form>


    </>
  )
}

StudentAdd.propTypes = {
    addStudent: PropTypes.func,
}


