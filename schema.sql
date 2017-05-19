CREATE DATABASE eatdaburger;

USE eatdaburger;

CREATE TABLE burgers (
	id int NOT NULL AUTO_INCREMENT,
	burger VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)

);

INSERT INTO burgers (burger) VALUES ("Bacon Double Cheeseburger");
INSERT INTO burgers (burger) VALUES ("Smokehouse BBQ Burger");