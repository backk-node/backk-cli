# backk-cli

`backk-cli` is a command line tool for creating new Backk microservice projects.

## Prerequisites

Node.js >= 12.19

## Preparation
Before creating a new Backk microservice project with `backk-cli`, prepare to answer the following questions:

* Which database do you want to use? (If you want to use distributed transactions, you have to select a database even if you don't need it otherwise)
  * MySQL or MariaDB or compatible
  * PostgreSQL or compatible
  * MongoDB
  * None
* Which request processors do you want to use? (At least one must be selected)
  * HTTP server
  * Kafka consumer
  * Redis consumer
* Which HTTP version do you want to use for HTTP server? (This will be asked only if you selected HTTP server in the previous question)
  * HTTP/1.1 (default)
  * HTTP/2
* Do you want to access remote microservices using Kafka? (Yes/**No**) (This will be asked only if you did not select Kafka consumer in one of the earlier questions)
* Do you want to access remote microservices using Redis or use Redis response cache? (Yes/**No**) (This will be asked only if you did not select Redis consumer in one of the earlier questions)
* What Docker registry do you want to use in development environment? (Default: docker.io)
* What Docker repository namespace do you want to use in development environment? (For example, if your Docker repository is 'docker.io' and namespace is 'my-app', your microservice Docker repository will be 'docker.io/my-app/microservice-name')
* What Docker registry do you want to use for main branch releases? (Default: docker.io)
* What Docker repository namespace do you want to use for main branch releases? (For example, if your Docker repository is 'docker.io' and namespace is 'my-app', your microservice Docker repository will be 'docker.io/my-app/microservice-name')
* What is SonarCloud/SonarQube organisation?
* What other synchronous (HTTP-based) Backk microservices your microservice depends on? Provide the namespaced microservice names (`microservice-name.namespace`) separated by commas. If the namespace is `default` it can be omitted. (For example: user-profile-service,notification-service.platform)
  * **NOTE!** If you depend on other microservices that are asynchronous (i.e. accessed via Kafka/Redis), you should NOT list them here!

## Create a new Backk microservice project

Execute the below command to create a new Backk microservice project.
This command will create a directory named `microservice-name` in the current directory.

```bash
npx backk-cli@latest create <microservice-name>
cd <microservice-name>
```

Follow further instructions in the README.md of the created project.
