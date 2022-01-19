#!/usr/bin/env node
const inquirer = require("inquirer");

const microserviceDirectory = process.argv[2];

if (!microserviceDirectory) {
  console.log(
    "You must give the microservice directory as command line argument."
  );
  process.exit(1);
}

const dbQuestion = {
  type: "list",
  name: "database",
  message: "Which database do you want to use?",
  choices: [
    "MySQL or MariaDB or compatible",
    "PostgreSQL or compatible",
    "MongoDB",
    "None"
  ],
};

inquirer
  .prompt([
   dbQuestion
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    console.log(error);
  });
