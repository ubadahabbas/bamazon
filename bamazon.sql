DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("The Alchemist", "Novels", 30,250);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("The Power of Habit", "Self Help", 25,200);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Thinking Fast and Slow", "Self Help", 20,200);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Origin", "Thriller", 40,350);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("The Hobbit", "Novels", 20,150);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Season of Migration to the North", "Fiction", 35,250);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("The Wedding of Zein", "Fiction", 20,150);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Khartoum at Night", "History", 15,50);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Milk and honey", "Poetry", 15, 90);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Seriously...I'm Kidding", "Humer", 30,250);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
 department_name VARCHAR(100) NOT NULL,
  over_head_costs INT default 0,
  PRIMARY KEY (department_id)
);

ALTER TABLE products 
ADD product_sales INT default 0;