#!/usr/bin/env node

const chalk = require('chalk');
const createMicroserviceProject = require('./createMicroserviceProject');

const operation = process.argv[2];

if (operation?.toLowerCase() !== 'create') {
  console.log(chalk.red(
    'ERROR! You must give the operation to execute. Operation can be one of the following: create'
  ));
  process.exit(1);
}

const microserviceName = process.argv[3];
if (!microserviceName) {
  console.log(chalk.red('ERROR! You must give the microservice name'));
  process.exit(1);
}

if (!microserviceName.match(/^[a-z-0-9]+$/)) {
  console.log(chalk.red('ERROR! Invalid microservice name: ' + microserviceName + '. Microservice name can contain only lowercase letters, numbers and hyphens'));
  process.exit(1);
}

// noinspection JSIgnoredPromiseFromCall
createMicroserviceProject(microserviceName);


