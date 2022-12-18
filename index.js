const cTable = require("console.table");
const inquirer = require("inquirer");
const db = require("./src/db_helper");
// import models;
const { Department, Role, Employee } = require("./model");
// import helper query functions
const {
  updateEmployee,
  createEmployee,
  listEmployees,
  listEmployeesIdAndNames,
  updateEmployeeRole,
} = require("./src/employee_helper");
const {
  createDepartment,
  listDepartments,
  listDepartmentsIdAndName,
} = require("./src/department_helper");
const {
  createRole,
  listRoles,
  listRolesIdAndTitle,
} = require("./src/role_helper");

// // Questions prompted when starting the application
const choiceArray = [
  {
    type: "list",
    name: "options",
    message: "Please choose one of the following options.",
    pageSize: 8,
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];

// subsequent prompts based on user's choice
var choice_prompt = function () {
  inquirer.prompt(choiceArray).then((answers) => {
    switch (answers.options) {
      case "View all departments":
        listDepartments(choice_prompt);
        break;
      case "View all roles":
        listRoles(choice_prompt);
        break;
      case "View all employees":
        listEmployees(choice_prompt);
        break;
      case "Add a department":
        departmentCreatePrompt();
        break;
      case "Add a role":
        roleCreatePrompt();
        break;
      case "Add an employee":
        employeeCreatePrompt();
        break;
      case "Update an employee role":
        listEmployeePrompt();
        break;
      case "Quit":
        console.log("Quit the application.");
        db.end();
        break;
      default:
        console.error("Unexpected choice.");
        break;
    }
  });
};

var departmentCreatePrompt = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter department's name.",
        name: "depName",
      },
    ])
    .then((answers) => {
      var depName = answers.depName;
      var depObj = new Department(depName);
      createDepartment(depObj, choice_prompt);
    });
};

var roleCreatePrompt = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter role's title.",
        name: "title",
      },
      {
        type: "input",
        message: "Please enter role's salary.",
        name: "salary",
      },
    ])
    .then((answers) => {
      listDepartmentPrompt(answers.title, answers.salary);
    });
};

var listDepartmentPrompt = function (title, salary) {
  var choices = [
    {
      type: "list",
      name: "options",
      message: "Please choose one of the departments.",
      pageSize: 8,
      choices: [],
    },
  ];
  listDepartmentsIdAndName((results) => {
    // console.log(results);
    results.forEach((idNameItem) => {
      choices[0].choices.push(JSON.stringify(idNameItem));
    });
    choices.pageSize = results.length;
    inquirer.prompt(choices).then((answers) => {
      var optObj = JSON.parse(answers.options);
      var newRole = new Role(title, salary);
      createRole(newRole, optObj.id, choice_prompt);
    });
  });
};

var employeeCreatePrompt = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter employee's first name.",
        name: "employee_first_name",
      },
      {
        type: "input",
        message: "Please enter employee's last name.",
        name: "employee_last_name",
      },
      {
        type: "input",
        message: "Please enter employee's role title.",
        name: "employee_role_title",
      },
      {
        type: "input",
        message: "Please enter employee's manager first name.",
        name: "manager_first_name",
      },
      {
        type: "input",
        message: "Please enter employee's manager last name.",
        name: "manager_last_name",
      },
    ])
    .then((answers) => {
      createEmployee(
        answers.employee_first_name,
        answers.employee_last_name,
        answers.employee_role_title,
        answers.manager_first_name,
        answers.manager_last_name,
        choice_prompt
      );
    });
};

var listEmployeePrompt = function () {
  var choices = [
    {
      type: "list",
      name: "options",
      message: "Please choose one of the employees.",
      choices: [],
    },
  ];
  listEmployeesIdAndNames((results) => {
    results.forEach((idNameItem) => {
      choices[0].choices.push(JSON.stringify(idNameItem));
    });
    choices[0].pageSize = results.length;
    inquirer.prompt(choices).then((answers) => {
      var optObj = JSON.parse(answers.options);
      updateEmployeeRolePrompt(optObj.id);
    });
  });
};

var updateEmployeeRolePrompt = function (id) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the new role title.",
        name: "title",
      },
    ])
    .then((answers) => {
      updateEmployeeRole(id, answers.title, choice_prompt);
    });
};

var listRolePrompt = function () {
  // TODO:
  const roleChoice = [
    {
      type: "expand",
      name: "options",
      message: "Please choose one of the roles.",
      pageSize: 8,
      choices: [],
    },
  ];
  listRolesIdAndTitle((results) => {
    console.log("here...........");
    console.log(results);
  });
};

var employeeUpdatePrompt = function () {
  // TODO:
};

// main entry
choice_prompt();
