USE carpool ;

CREATE TABLE "Users" (
    id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    "phone number" BIGINT NOT NULL,
    "review score" INT,
    password VARCHAR(100) NOT NULL,
    birthdate DATE,
    photo VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE Rides (
	id INT NOT NULL,
    "car color" VARCHAR(100) NOT NULL,
    "car model" VARCHAR(100) NOT NULL,
    cost INT,
    destination VARCHAR(100) NOT NULL,
    "driver id" INT NOT NULL,
    "no of free seats" INT NOT NULL,
    "no of passengers" INT,
    pet BIT NOT NULL,
    smoking BIT,
    "starting point" VARCHAR(100) NOT NULL,
    "time and date" DATE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE "Go" (
    "driver id" INT NOT NULL,
    "passenger id" INT NOT NULL,
    "ride id" INT NOT NULL,
    PRIMARY KEY ("ride id")
);