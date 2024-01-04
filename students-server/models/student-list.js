const Student = require("./Student");

class StudentList {
  constructor() {
    this.students = [
      new Student("Aldo"),
      new Student("Matias"),
      new Student("Yurik"),
      new Student("Cristian"),
    ];
  }

  getStudents() {
    return this.students;
  }

  addStudent(name) {
    const newStudent = new Student(name);

    this.students.push(newStudent);
    return this.students;
  }

  removeStudent(id) {
    this.students = this.students.filter((student) => student.id !== id);
  }

  increaseVotes(id) {
    this.students = this.students.map((student) => {
      if (student.id === id) {
        student.votes += 1;
      }

      return student;
    });

    console.log(this.students)
  }

  changeStudentName(id, name) {
    this.students = this.students.map((student) => {
      if (student.id === id) {
        student.name = name;
      }

      return student;
    });
  }
}

module.exports = StudentList;
