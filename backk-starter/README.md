# backk-starter

## Development environment

### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) >= 12.19
2. If your microservice uses a database, you need to install a local instance of the database. For the local database, use default configuration of database port, username and password.
   You can also run a database in a container. For running a container in Mac or Windows, you need to install [Docker Desktop](https://www.docker.com/products/docker-desktop). You can use the same database installation for developing multiple Backk microservices. Backk will create a separate database/schema for each microservice. For local database installations:
    - [Download and install PostgreSQL](https://www.postgresql.org/download/) or [run PostgreSQL in a container](https://hub.docker.com/_/postgres)
    - [Download and install MySQL](https://www.mysql.com/downloads/) or [run MySQL in a container](https://hub.docker.com/_/mysql)
    - [Download and install MariaDB](https://mariadb.org/download/) or [run MariaDB in a container](https://hub.docker.com/_/mariadb)
    - [Download and install MongoDB](https://www.mongodb.com/try/download/community) or [run MongoDB in a container](https://hub.docker.com/_/mongo)
    - [Download and install Vitess](https://vitess.io/docs/get-started/local/) or [run Vitess in a container](https://vitess.io/docs/get-started/local-docker)
    - [Download and install CockroachDB](https://www.cockroachlabs.com/docs/stable/install-cockroachdb.html) or [run CockroachDB in a container](https://hub.docker.com/r/cockroachdb/cockroach)
    - [Download and install YugabyteDB](https://download.yugabyte.com/) or [run YugabyteDB in a container](https://hub.docker.com/r/yugabytedb/yugabyte)
3. If your microservice uses Kafka, you need to install a local instance of Kafka. You can use the same Kafka installation for developing multiple microservices. By default, each microservice will only consume messages from a topic named after the microservice. For local Kafka installation:
    - [Download and install Kafka](https://kafka.apache.org/downloads) or [run Kafka in a container](https://hub.docker.com/r/wurstmeister/kafka)
4. If your microservice uses Redis (as message queue and/or response cache), you need to install a local instance of Redis. You can use the same Redis installation for developing multiple microservices. By default, each microservice will only consume messages from a Redis list named after the microservice. For local Redis installation:
    - [Download and install Redis](https://redis.io/download) or [run Redis in a container](https://hub.docker.com/_/redis)

### <a name="get-started"></a> Get Started

Follow the below steps. In Windows, you should use Git Bash as shell.

1. Run `npm install`
2. Run `npm run build`
3. Generate the [OpenAPI 3](https://swagger.io/specification/) API specs for your API implementation with following command:
   ```bash
   npm run generateApiSpecs
   ```
4. Run `npm start:dev`<br/><br/>
   There is one example service in `src/services/example` directory that you can use as a basis for your own service(s).
   If/When you don't need that example service anymore, just delete the `src/services/example` directory and remove the example service instantiation also from the `MicroserviceImpl` class in `src/microservice.ts` file.
5. You can use and test your microservice API using [Postman](https://www.postman.com/downloads/) or [SwaggerHub](https://app.swaggerhub.com/home)  
   For Postman:
    1. Launch Postman
    2. Choose `Import` and then choose file `generated/openapi/openApiPublicSpec.yaml`

   For SwaggerHub:
    1. Navigate to [SwaggerHub](https://app.swaggerhub.com/home)
    2. Choose `Create New` and then `Import and Document API` and then choose file `generated/openapi/openApiPublicSpec.yaml`
6. Backk automatically generates some integration tests, and they can be run with following command:
   ```bash
   # NOTE! You need to have the microservice running before executing the integration tests,
   # so ensure you have run npm run start:dev before running the below command
   
   npm run integrationtest:dev
   ```
   You can also import the integration tests to Postman from file `generated/integrationtests/integrationTestsPostmanCollection.json`

