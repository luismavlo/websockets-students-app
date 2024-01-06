const StudentList = require("./student-list");

class Socket {
  constructor(io) {
    this.io = io;
    this.studentList = new StudentList();

    this.socketsEvents();
  }

  socketsEvents() {
    //ESCUCHAR TODOS LOS CLIENTES QUE SE CONECTAN
    this.io.on("connection", (socket) => {

      socket.emit("current-students", this.studentList.getStudents());

      socket.on('vote-student', (id) => {
        this.studentList.increaseVotes(id);

        this.io.emit("current-students", this.studentList.getStudents());
      })

      socket.on('delete-student', (id) => {
        this.studentList.removeStudent(id);

        this.io.emit('current-students', this.studentList.getStudents());
      })

      socket.on('change-student-name', ({ id, name }) => {
        this.studentList.changeStudentName(id, name);

        this.io.emit('current-students', this.studentList.getStudents());
      })

      socket.on('add-student', ({ name }) => {
        this.studentList.addStudent(name);

        this.io.emit('current-students', this.studentList.getStudents());
      })

    })
  }
}

module.exports = Socket;
