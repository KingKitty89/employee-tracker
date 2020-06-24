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
  title VARCHAR(30),
  salary DECIMAL(19,4),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Doe", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melrose", "Cat", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Franklin", "Cat", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Morgan", "Snorgan", 3, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tina", "Beana", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Ike", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jess", "Mess", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Belly", 1, 1);