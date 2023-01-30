// Employee class
class Employee {
  constructor(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
  }

  getFirstName() {
    return this.first_name;
  }

  getLastName() {
    return this.last_name;
  }
}

module.exports = Employee;
