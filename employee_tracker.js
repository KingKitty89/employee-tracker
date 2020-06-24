var mysql = require("mysql");
var inquirer = require("inquirer");
const path = require('path');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Ptmdlbts1$",
    database: "employee_trackerDB"
});
// // array of questions for user
// * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

function askQuestions() {
    inquirer
        .prompt({

            type: "rawlist",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Role",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Department",
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

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Department":
                    updateDept();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
};

//view all employees in database
//need to join with other tables
function viewEmployees() {
    
    connection.query("SELECT id, first_name, last_name FROM employee", function(err,res) {
        if (err) throw err;
      console.log("\n All employees retrieved from database. \n");
      console.table(res);
      askQuestions(); 
    }); 
};

//view all employees in database by department
//need to join with other tables
function viewByDept() {
    
    connection.query("SELECT name FROM department", function(err,res) {
        if (err) throw err;
      console.log("\n All employees retrieved from database by department. \n");
      console.table(res);
      askQuestions(); 
    }); 
};

//view all employees in database by role
//need to join with other tables
function viewByRole() {
    
    connection.query("SELECT * FROM role", function(err,res) {
        if (err) throw err;
      console.log("\n All employees retrieved from database by role. \n");
      console.table(res);
      askQuestions(); 
    }); 
};

//Add employee function in progess.
function addEmployee() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Enter employee first name",
          name: "firstname"
        },
        {
          type: "input",
          message: "Enter employee last name",
          name: "lastname"
        }
      ])
    .then(function(res) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: res.firstname,
            last_name: res.lastname,
        },
        function(err, res) {
          if (err) {
            throw err;
          }
          
          console.table(res);
          
        }
       
      );
      askQuestions();
   
    });
    
}
  







// function init() {
//     inquirer
//         .prompt(questions)
//         .then((data) => {

//         }).catch((err) => {
//             console.log(err);
//         })
// }

// // function call to initialize program
// init();

