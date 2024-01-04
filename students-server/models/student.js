const { randomUUID } = require("node:crypto");

class Student {
  constructor(name) {
    this.id = randomUUID();
    this.name = name;
    this.votes = 0;
  }
}

module.exports = Student;
