# backk-cli

## :construction: Under construction!

## Prerequisites

Node.js >= 12.19

## Preparation
When create a new Backk microservice project with `backk-cli`, prepare to answer to following questions:

* Which database do you want to use?
  * MySQL or MariaDB or compatible
  * PostgreSQL or compatible
  * MongoDB
  * None
* Which request processors do you want to use?
  * HTTP server
  * Kafka consumer
  * Redis consumer
* Which HTTP version do you want to use for HTTP server?
  * HTTP/1.1
  * HTTP/2
* Do you want to access remote microservices using Kafka? (Yes/No)
* Do you want to access remote microservices using Redis? (Yes/No)
* What Docker registry do you want to use in development environment? (Default: docker.io)
* What Docker repository namespace do you want to use in development environment?
* What Docker registry do you want to use for main branch releases? (Default: docker.io)
* What Docker repository namespace do you want to use for main branch releases?
* What is SonarCloud/SonarQube organisation?
* What other Backk microservices your microservice depends on? Provide the names of the microservices separated by commas

## Create a new Backk microservice project

Execute below command to create a new Backk microservice project.
This command will create a directory with given microservice name in the current directory.

```bash
npx backk-cli@latest create <microservice-name>
cd <microservice-name>
```
