DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(19,4) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales");
VALUES ("Engineering");
VALUES ("Finance");
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
VALUES ("Salesperson", 80000, 1);
VALUES ("Lead Engineer", 150000, 2);
VALUES ("Accountant", 125000, 3);
VALUES ("Legal Team Lead", 250000, 4);
VALUES ("Lawyer", 190000, 4);
VALUES ("Software Engineer", 120000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Doe", 1, 1);
VALUES ("Melrose", "Cat", 1, 1);
VALUES ("Franklin", "Cat", 2, 2);
VALUES ("Morgan", "Snorgan", 3, 3);
VALUES ("Tina", "Beana", 4, 4);
VALUES ("Mike", "Ike", 4, 4);
VALUES ("Jess", "Mess", 2, 2);
VALUES ("Kelly", "Belly", 1, 1);