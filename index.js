#!/usr/bin/env node
const inquirer = require("inquirer");

const microserviceDirectory = process.argv[2];

if (!microserviceDirectory) {
  console.log(
    "You must give the microservice directory as command line argument."
  );
  process.exit(1);
}

const databaseQuestion = {
  type: "list",
  name: "database",
  message: "Which database do you want to use?",
  choices: [
    "MySQL or MariaDB or compatible",
    "PostgreSQL or compatible",
    "MongoDB",
    "None",
  ],
};

const requestProcessorQuestion = {
  type: "checkbox",
  name: "requestProcessor",
  message: "Which request processors do you want to use?",
  choices: ["HTTP Server", "Kafka Consumer", "Redis Consumer"],
  validate(answers) {
    if (answers.length < 1) {
      return 'You must choose at least one request processor.';
    }

    return true;
  },
};

inquirer
  .prompt([databaseQuestion, requestProcessorQuestion])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    console.log(error);
  });
