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
  password: "",
  database: "employee_trackerDB"
});
// // array of questions for user
// * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

const questions = [
    
    {
        type:"rawlist",
        message: "What would you like to do?",
        name: "choices",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Role",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Department"

        ]
    },
    
];

function init() {
    inquirer
    .prompt (questions)
.then ((data) => {

}).catch((err)=>{
    console.log(err);
})
}

// function call to initialize program
init();

