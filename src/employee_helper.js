const db = require("./db_helper");

// helper function for creating employees in db.
var createEmployee = function (
  firstName,
  lastName,
  role,
  managerFirstName,
  managerLastName,
  cb
) {
  const findManagerIdSql = `SELECT id FROM employees WHERE first_name = "${managerFirstName}" AND last_name = "${managerLastName}"`;

  db.query(findManagerIdSql, (err, managerIdResults) => {
    const findRoleIdSql = `SELECT id FROM roles WHERE title = "${role}"`;

    db.query(findRoleIdSql, (err, roleIdResults) => {
      const addEmployeeSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleIdResults[0].id}, ${managerIdResults[0].id})`;

      db.query(addEmployeeSql, (err, results) => {
        if (err) {
          console.error("add employee failed:", err);
        } else {
          console.log("success");
        }
        cb();
      });
    });
  });
};

// helper function for selecting all employees from db
var listEmployees = function (cb) {
  const listEmployeesSql = `SELECT 
employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name, e2.first_name as manager_first_name, e2.last_name as manager_last_name  
from employees 
	left join roles 
		on employees.role_id = roles.id 
	left join departments 
		on roles.department_id = departments.id 
	left join (SELECT employees.id, employees.first_name, employees.last_name FROM employees) e2 
		on employees.manager_id = e2.id;`;
  db.query(listEmployeesSql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      cb();
    }
  });
};

// helper function for updating employees in db.
var updateEmployee = function (employee, roleId, cb) {
  var updateSql = `UPDATE employees SET ${employee.getRoleId()} = roleId`;
  db.query(updateSql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      cb();
    }
  });
};

var listEmployeesIdAndNames = function (cb) {
  db.query(
    "SELECT id, first_name, last_name FROM employees",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        cb(results);
      }
    }
  );
};

var updateEmployeeRole = function (empId, roleTitle, cb) {
  db.query(
    `SELECT id from roles where title = "${roleTitle}"`,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        db.query(
          `UPDATE employees SET role_id=${results[0].id} WHERE id = ${empId}`,
          (err, results) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`update employee ID: ${empId}  success.`);
              cb();
            }
          }
        );
      }
    }
  );
};

module.exports = {
  createEmployee,
  listEmployees,
  updateEmployee,
  listEmployeesIdAndNames,
  updateEmployeeRole,
};
