var mysql = require("mysql");
var inquirer = require("inquirer");
const path = require('path');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,



    user: "root",

   
    password: "Ptmdlbts1$",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});
//Begin to ask the user questions
function askQuestions() {
    inquirer
        .prompt({

            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Role",
                "Add Employee",
                "Update Employee Role",
                "exit"

            ]
        })
        .then(function (answer) {
            switch (answer.choices) {
                case "View All Employees":
                    console.log("view")
                    viewEmployees();
                    break;

                case "View All Employees By Department":
                    viewByDept();
                    break;

                case "View All Employees By Role":
                    viewByRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "exit":
                    connection.end();
    
                    
            }
        });
};

//view all employees in database
function viewEmployees() {
    connection.query("SELECT first_name, last_name, department.name, role.title, role.salary FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database. \n");
        console.table(res);
        askQuestions();
    });
};

//view all employees in database by department
function viewByDept() {

    connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by department. \n");
        console.table(res);
        askQuestions();
    });
};

//view all employees in database by role
function viewByRole() {

    connection.query("SELECT first_name, last_name, role.title FROM((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by role. \n");
        console.table(res);
        askQuestions();
    });
};

//Add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's first name:",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee's last name:",
                name: "lastname"
            },
            {
                type: "input",
                message: "Enter employee's role id:",
                name: "roleid"

            },
            {
                type: "input",
                message: "Enter employee's manager id:",
                name: "managerid"
            },

        ])
        .then(function (answer) {
            if (answer.firstname === '' || answer.lastname === '' || answer.roleid === '' || answer.managerid === '') {
                console.log("Enter a response for all fields or go back to main menu.");
                inquirer
                    .prompt({
                        type: "list",
                        message: "Enter a response for all fields or go back to main menu.",
                        name: "choices",
                        choices: [
                            "Add Employee",
                            "Main Menu"
                        ]
                    })
                    .then(function (res) {
                        if (res.choices === "Add Employee") {
                            addEmployee();
                        } else {
                            askQuestions();
                        }
                    })
            } else {
                connection.query("INSERT INTO employee SET ?",
                    { first_name: answer.firstname, last_name: answer.lastname, role_id: answer.roleid, manager_id: answer.managerid }, function (err, res) {
                        if (err) throw err;
                        console.log("\n Database with added employee. \n");
                        viewEmployees();


                    });
            };

        });
};

function updateRole() {
    let allEmployees = [];
    connection.query("SELECT * FROM employee", function(err, answer) {
     
      for (let i = 0; i < answer.length; i++) {
        let employeeString =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        allEmployees.push(employeeString);
      }
     
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmpRole",
            message: "select employee to update role",
            choices: allEmployees
          },
          {
            type: "list",
            message: "select new role",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Accountant"],
            name: "newrole"
          }
        ])
        .then(function(answer) {
          console.log("about to update", answer);
          const idToUpdate = {};
          idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
          switch (answer.choices) {
            case "Sales Lead":
                idToUpdate.role_id = 1;
                break;
            case "Salesperson":
                idToUpdate.role_id = 1;
                break;
            case "Lead Engineer":
                idToUpdate.role_id = 2;
                break;
            case "Accountant":
                idToUpdate.role_id = 3;
                break;
            case "Legal Team Lead":
                idToUpdate.role_id = 4;
                break;
            case "Lawyer":
                idToUpdate.role_id = 4;
                break;
            case "Software Engineer":
                idToUpdate.role_id = 2;
                break;
          }
            connection.query(
                "UPDATE employee SET role_id=? WHERE first_name= ?",[answer.updateEmpRole, answer.newrole],
        
            function(err, data) {
              viewEmployees();
            }
          );
        });
    });
  }