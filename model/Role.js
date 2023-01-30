// Role class
class Role {
  constructor(title, salary) {
    this.title = title;
    this.salary = salary;
  }

  getTitle() {
    return this.title;
  }

  getSalary() {
    return this.salary;
  }
}

module.exports = Role;
