USE `gF4kJqQJiJ`;

CREATE TABLE `Users` (
    `id` INT(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone number` INT(20) NOT NULL,
    `review score` INT(1),
    `password` VARCHAR(100) NOT NULL,
    `birthdate` DATE,
    `photo` VARCHAR(100),
    PRIMARY KEY(`id`)
);

CREATE TABLE `Rides` (
	`id` INT(10) NOT NULL,
    `car color` VARCHAR(100) NOT NULL,
    `car model` VARCHAR(100) NOT NULL,
    `cost` INT(10),
    `destination` VARCHAR(100) NOT NULL,
    `driver id` INT (10) NOT NULL,
    `no of free seats` INT (10) NOT NULL,
    `no of passengers` INT (10),
    `pet` BOOLEAN,
    `smoking` BOOLEAN,
    `starting point` VARCHAR(100) NOT NULL,
    `time and date` DATE NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `Go` (
    `driver id` INT(10) NOT NULL,
    `passenger id` INT(10) NOT NULL,
    `ride id` INT(10) NOT NULL,
    PRIMARY KEY (`ride id`)
);

