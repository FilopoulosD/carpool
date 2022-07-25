CREATE DATABASE `carpool`;
USE `carpool`;
drop table `Rides`,Users, Go;

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) character set utf8 ,
    `email` VARCHAR(100) ,
    `phoneNumber` BIGINT ,
    `reviewScore` INT,
    `password` VARCHAR(100) ,
    `birthdate` DATE,
    `photo` VARCHAR(100),
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `Rides` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `carModel` VARCHAR(100) NOT NULL,
    `cost` INT,
    `destination` VARCHAR(100) NOT NULL,
    `driverId` INT NOT NULL,
    `freeSeats` INT NOT NULL,
    `passengers` INT,
    `pet` BIT NOT NULL,
    `smoking` BIT,
    `startingPoint` VARCHAR(100) NOT NULL,
    `timeAndDate` DATE NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`driverId`) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS `Go` (
    `driverId` INT NOT NULL,
    `passengerId` INT NOT NULL,
    `rideId` INT NOT NULL,
    PRIMARY KEY (`rideId`),
    FOREIGN KEY (`driverId`) REFERENCES  Users(id),
    FOREIGN KEY (`passengerId`) REFERENCES Users(id),
    FOREIGN KEY (`rideId`) REFERENCES Rides(id)
);



ALTER DATABASE carpool CHARACTER SET utf8 COLLATE utf8_general_ci;