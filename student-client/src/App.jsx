import { StudentAdd } from "./components/StudentAdd"
import { StudentList } from "./components/StudentList"
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const connectionSocketServer = () => {
    const socket = io.connect("http://localhost:3000", {
        transports: ["websocket"],
    })

    return socket;
}

function App() {

    const [ socket ] = useState(connectionSocketServer());
    const [online, setOnline] = useState(false);
    const [students, setStudents] = useState([])

    useEffect(() => {
        setOnline(socket.connected)
    }, [socket]);

    useEffect(() => {
        //connect
        socket.on("connect", () => {
            setOnline(true)
        })
    }, [socket]);

    useEffect(() => {
        socket.on("disconnect", () => {
            setOnline(false)
        })
    }, [socket]);
    //alguien quiere escuchar: on
    //alguien quiere enviar algo: emit
    //para hablar necesitamos un canal: general, react, fundamentos, node

    useEffect(() => {
        socket.on("current-students", (students) => {
            setStudents(students)
        })
    }, [socket]);

    const vote = (id) => {
        socket.emit('vote-student', id)
    }

    const deleteStudent = (id) => {
        socket.emit('delete-student', id)
    }

    const changeStudentName = (id, name) => {
        socket.emit('change-student-name', {id, name})
    }

    const addStudent = (name) => {
        socket.emit('add-student', { name })
    }

  return (
    <section className="container">
      <header className="alert">
        <h4>Services Status</h4>
          {
              online ? (
                  <span className="text-success">Online</span>
              ) : (
                  <span className="text-danger">Offline</span>
              )
          }
          <h1>Students Node Gen30</h1>
        <hr />
      </header>

      <article className="row">
        <div className="col-8">
          <StudentList
              data={students}
              vote={vote}
              deleteStudent={deleteStudent}
              changeStudentName={changeStudentName}
          />
        </div>
        <div className="col-4">
          <StudentAdd addStudent={addStudent}/>
        </div>
      </article>
    </section>
  )
}

export default App
