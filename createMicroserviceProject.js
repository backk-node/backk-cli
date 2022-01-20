const fs = require("fs");
const inquirer = require("inquirer");
const copyfiles = require("copyfiles");
const { replaceInFile } = require("replace-in-file");
const YAML = require("yaml");

// noinspection FunctionWithMoreThanThreeNegationsJS,OverlyComplexFunctionJS,FunctionTooLongJS
async function createMicroserviceProject(microserviceName) {
  try {
    const dockerComposeObj = YAML.parse(
      fs.readFileSync(process.cwd() + "/backk-starter/docker-compose.yml", {
        encoding: "utf8",
      })
    );

    const dockerComposeCommandParts = [
      "docker-compose --env-file .env.ci run wait-for-services-ready -c microservice:3001",
    ];

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
    const databaseAnswer = await inquirer.prompt([databaseQuestion]);

    const requestProcessorQuestion = {
      type: "checkbox",
      name: "requestProcessors",
      message: "Which request processors do you want to use?",
      choices: ["HTTP server", "Kafka consumer", "Redis consumer"],
      validate(answers) {
        if (answers.length < 1) {
          return "You must choose at least one request processor.";
        }

        return true;
      },
    };

    const requestProcessorsAnswer = await inquirer.prompt([
      requestProcessorQuestion,
    ]);

    let httpVersionAnswer = {};
    if (requestProcessorsAnswer.requestProcessors.includes("HTTP Server")) {
      const httpVersionQuestion = {
        type: "list",
        name: "httpVersion",
        message: "Which HTTP version do you want to use for HTTP server?",
        default: "HTTP/1.1",
        choices: ["HTTP/1.1", "HTTP/2"],
      };

      httpVersionAnswer = await inquirer.prompt(httpVersionQuestion);
    }

    let kafkaUsageAnswer = { doesUseKafka: true };
    if (!requestProcessorsAnswer.requestProcessors.includes("Kafka consumer")) {
      const kafkaUsageQuestion = {
        type: "confirm",
        name: "doesUseKafka",
        message: "Do you want to access remote microservices using Kafka?",
        default: false,
      };

      kafkaUsageAnswer = await inquirer.prompt(kafkaUsageQuestion);
    }

    let redisUsageAnswer = { doesUseRedis: true };
    if (!requestProcessorsAnswer.requestProcessors.includes("Redis consumer")) {
      const redisUsageQuestion = {
        type: "confirm",
        name: "doesUseRedis",
        message: "Do you want to access remote microservices using Redis?",
        default: false,
      };

      redisUsageAnswer = await inquirer.prompt(redisUsageQuestion);
    }

    const devDockerRegistryQuestion = {
      type: "input",
      name: "dockerRegistry",
      message:
        "What Docker registry do you want to use in development environment?",
      default: "docker.io",
    };

    const devDockerRegistryAnswer = await inquirer.prompt([
      devDockerRegistryQuestion,
    ]);

    const devDockerRepositoryNamespaceQuestion = {
      type: "input",
      name: "dockerRepositoryNamespace",
      message:
        "What Docker repository namespace do you want to use in development environment?",
      validate(input) {
        if (!input) {
          return "Docker repository namespace cannot be empty.";
        }
        return true;
      },
    };

    const devDockerRepositoryNamespaceAnswer = await inquirer.prompt([
      devDockerRepositoryNamespaceQuestion,
    ]);

    const mainDockerRegistryQuestion = {
      type: "input",
      name: "dockerRegistry",
      message:
        "What Docker registry do you want to use for main branch releases?",
      default: "docker.io",
    };

    const mainDockerRegistryAnswer = await inquirer.prompt([
      mainDockerRegistryQuestion,
    ]);

    const mainDockerRepositoryNamespaceQuestion = {
      type: "input",
      name: "dockerRepositoryNamespace",
      message:
        "What Docker repository namespace do you want to use for main branch releases?",
      validate(input) {
        if (!input) {
          return "Docker repository namespace cannot be empty.";
        }

        return true;
      },
    };

    const mainDockerRepositoryNamespaceAnswer = await inquirer.prompt([
      mainDockerRepositoryNamespaceQuestion,
    ]);

    const sonarOrganizationQuestion = {
      type: "input",
      name: "sonarOrganization",
      message: "What is SonarCloud/SonarQube organisation?",
      validate(input) {
        if (!input) {
          return "Organization cannot be empty.";
        }

        return true;
      },
    };

    const sonarOrganizationAnswer = await inquirer.prompt([
      sonarOrganizationQuestion,
    ]);

    const dependentBackkMicroservicesQuestion = {
      type: "input",
      name: "dependentBackkMicroservices",
      message:
        "What other Backk microservices your microservice depends on? Provide the names of the microservices separated by commas",
    };

    const dependentBackkMicroservicesAnswer = await inquirer.prompt([
      dependentBackkMicroservicesQuestion,
    ]);

    const microserviceDir = process.cwd() + "/" + microserviceName;

    if (fs.existsSync(microserviceDir)) {
      if (fs.readdirSync(microserviceDir).length !== 0) {
        console.error(
          "Cannot create Backk microservice project. Directory: " +
            microserviceDir +
            " is not empty."
        );
        process.exit(1);
      }
    } else {
      fs.mkdirSync(microserviceDir);
    }

    await new Promise((resolve, reject) => {
      copyfiles(
        ["backk-starter/**/*", microserviceName],
        { up: 1, all: true },
        (error) => {
          if (error) {
            reject();
          } else {
            resolve();
          }
        }
      );
    });

    const replaceConfig = {
      files: [
        microserviceDir + "/package.json",
        microserviceDir + "/.env.dev",
        microserviceDir + "/.env.ci",
        microserviceDir + "/package-lock.json",
        microserviceDir + "/sonar-project.properties",
        microserviceDir + "/.github/workflows/ci.yaml",
        microserviceDir + "/helm/backk-starter/Chart.yaml",
        microserviceDir + "/helm/backk-starter/values.yaml",
        microserviceDir + "/helm/values/values-minikube.yaml",
      ],
      from: /backk-starter/g,
      to: microserviceName,
    };

    await replaceInFile(replaceConfig);

    if (databaseAnswer.database === "MySQL or MariaDB or compatible") {
      await replaceInFile({
        files: [microserviceDir + "/src/microservice.ts"],
        from: [
          /\s*MongoDbDataStore,\s*/g,
          /\s*PostgreSqlDataStore,\s*/g,
          /\s*NullDataStore,\s*/g,
          /\/\/ const dataStore = new PostgreSqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MongoDbDataStore\(\);\s*/g,
          /\/\/ const dataStore = new NullDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MySqlDataStore\(\);/g,
        ],
        to: ["", "", "", "", "", "", "const dataStore = new MySqlDataStore();"],
      });
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [/\s*"mongodb": "3.6.6",\s*/g, /\s*"pg": "\^8.0.2",\s*/g],
        to: ["", ""],
      });
      delete dockerComposeObj.services.postgresql;
      delete dockerComposeObj.services.mongodb;
      dockerComposeObj.services.microservice.depends_on.push("mysql");
    } else if (databaseAnswer.database === "PostgreSQL or compatible") {
      const replaceConfig = {
        files: [microserviceDir + "/src/microservice.ts"],
        from: [
          /\s*MongoDbDataStore,\s*/g,
          /\s*MySqlSqlDataStore,\s*/g,
          /\s*NullDataStore,\s*/g,
          /\/\/ const dataStore = new MySqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MongoDbDataStore\(\);\s*/g,
          /\/\/ const dataStore = new NullDataStore\(\);\s*/g,
          /\/\/ const dataStore = new PostgreSqlDataStore\(\);/g,
        ],
        to: [
          "",
          "",
          "",
          "",
          "",
          "",
          "const dataStore = new PostgreSqlDataStore();",
        ],
      };
      await replaceInFile(replaceConfig);
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [/\s*"mongodb": "3.6.6",\s*/g, /\s*"mysql2": "2.2.5",\s*/g],
        to: ["", ""],
      });
      delete dockerComposeObj.services.mysql;
      delete dockerComposeObj.services.mongodb;
      dockerComposeObj.services.microservice.depends_on.push("postgresql");
    } else if (databaseAnswer.database === "MongoDB") {
      const replaceConfig = {
        files: [microserviceDir + "/src/microservice.ts"],
        from: [
          /\s*PostgreSqlDataStore,\s*/g,
          /\s*MySqlSqlDataStore,\s*/g,
          /\s*NullDataStore,\s*/g,
          /\/\/ const dataStore = new PostgreSqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MySqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new NullDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MongoDbDataStore\(\);/g,
        ],
        to: [
          "",
          "",
          "",
          "",
          "",
          "",
          "const dataStore = new MongoDbDataStore();",
        ],
      };
      await replaceInFile(replaceConfig);
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [/\s*"pg": "\^8.0.2",\s*/g, /\s*"mysql2": "2.2.5",\s*/g],
        to: ["", ""],
      });
      delete dockerComposeObj.services.postgresql;
      delete dockerComposeObj.services.mysql;
      dockerComposeObj.services.microservice.depends_on.push("mongodb");
    } else {
      const replaceConfig = {
        files: [microserviceDir + "/src/microservice.ts"],
        from: [
          /\s*PostgreSqlDataStore,\s*/g,
          /\s*MySqlSqlDataStore,\s*/g,
          /\s*MongoDbDataStore,\s*/g,
          /\/\/ const dataStore = new PostgreSqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MySqlDataStore\(\);\s*/g,
          /\/\/ const dataStore = new MongoDbDataStore\(\);\s*/g,
          /\/\/ const dataStore = new NullDataStore\(\);/g,
        ],
        to: ["", "", "", "", "", "", "const dataStore = new NullDataStore();"],
      };
      await replaceInFile(replaceConfig);
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [
          /\s*"pg": "\^8.0.2",\s*/g,
          /\s*"mysql2": "2.2.5",\s*/g,
          /\s*"mongodb": "3.6.6",\s*/g,
        ],
        to: ["", "", ""],
      });
      delete dockerComposeObj.services.postgresql;
      delete dockerComposeObj.services.mongodb;
      delete dockerComposeObj.services.mysql;
    }

    if (!requestProcessorsAnswer.requestProcessors.includes("HTTP server")) {
      await replaceInFile({
        files: [microserviceDir + "/src/main.ts"],
        from: [/HttpServer,\s*/g, /new HttpServer\(\),\s*/g],
        to: ["", ""],
      });
    } else if (
      !requestProcessorsAnswer.requestProcessors.includes("Kafka consumer")
    ) {
      await replaceInFile({
        files: [microserviceDir + "/src/main.ts"],
        from: [/KafkaConsumer,\s*/g, /new KafkaConsumer\(\),\s*/g],
        to: ["", ""],
      });
    } else if (
      !requestProcessorsAnswer.requestProcessors.includes("Redis consumer")
    ) {
      await replaceInFile({
        files: [microserviceDir + "/src/main.ts"],
        from: [/, RedisConsumer/g, /new RedisConsumer\(\)/g],
        to: ["", ""],
      });
    }

    if (requestProcessorsAnswer.requestProcessors.includes("HTTP server")) {
      if (httpVersionAnswer.httpVersion === "HTTP/2") {
        await replaceInFile({
          files: [microserviceDir + "/src/main.ts"],
          from: [/HttpServer\(\)/g],
          to: ["HttpServer(2)"],
        });
      }
    }

    if (kafkaUsageAnswer.doesUseKafka) {
      dockerComposeObj.services.microservice.depends_on.push("kafka");
      dockerComposeCommandParts.push("kafka:9092");
    } else {
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [/\s*"kafkajs": "1.15.0",\s*/g],
        to: [""],
      });
      delete dockerComposeObj.services.kafka;
      delete dockerComposeObj.volumes;
    }

    if (redisUsageAnswer.doesUseRedis) {
      dockerComposeObj.services.microservice.depends_on.push("redis");
      dockerComposeCommandParts.push("redis:6379");
    } else {
      await replaceInFile({
        files: [microserviceDir + "/package.json"],
        from: [/\s*"ioredis": "\^4.19.2",\s*/g],
        to: [""],
      });
      delete dockerComposeObj.services.redis;
    }

    await replaceInFile({
      files: [microserviceDir + "/.env.dev", microserviceDir + "/.env.ci"],
      from: [/DOCKER_REGISTRY=docker.io/g],
      to: ["DOCKER_REGISTRY=" + devDockerRegistryAnswer.dockerRegistry],
    });

    await replaceInFile({
      files: [microserviceDir + "/.env.dev", microserviceDir + "/.env.ci"],
      from: [/DOCKER_REPOSITORY=<your-repository-namespace>\/backk-starter/g],
      to: [
        "DOCKER_REPOSITORY=" +
          devDockerRepositoryNamespaceAnswer.dockerRepositoryNamespace +
          "/" +
          microserviceName,
      ],
    });

    await replaceInFile({
      files: [microserviceDir + "/.github/workflows/ci.yaml"],
      from: [/docker.io/g],
      to: [mainDockerRegistryAnswer.dockerRegistry],
    });

    await replaceInFile({
      files: [microserviceDir + "/.github/workflows/ci.yaml"],
      from: [/<docker-repository-namespace>/g],
      to: [mainDockerRepositoryNamespaceAnswer.dockerRepositoryNamespace],
    });

    await replaceInFile({
      files: [microserviceDir + "/sonar-project.properties"],
      from: [/<your-organization-here>/g],
      to: [sonarOrganizationAnswer.sonarOrganization],
    });

    const EXPOSED_BASE_PORT = 18080;
    dependentBackkMicroservicesAnswer.dependentBackkMicroservices
      .split(",")
      .forEach((microserviceName, index) => {
        const trimmedMicroserviceName = microserviceName.trim();
        dockerComposeObj.services[trimmedMicroserviceName] = {
          container_name: trimmedMicroserviceName,
          image:
            mainDockerRegistryAnswer.dockerRegistry +
            "/" +
            mainDockerRepositoryNamespaceAnswer.dockerRepositoryNamespace +
            "/" +
            trimmedMicroserviceName,
          env_file: ".env.ci",
          restart: "always",
          ports: ["" + EXPOSED_BASE_PORT + index + ":8080"],
        };
        dockerComposeObj.services.microservice.depends_on.push(
          trimmedMicroserviceName
        );
        dockerComposeCommandParts.push(trimmedMicroserviceName + ":8080");
      });

    const dockerComposeCommand =
      dockerComposeCommandParts.join(",") + " -t 600";

    await replaceInFile({
      files: [microserviceDir + "/scripts/run-integration-tests-in-ci.sh"],
      from: [
        /docker-compose --env-file .env.ci run wait-for-services-ready -c microservice:3001 -t 600/g,
      ],
      to: [dockerComposeCommand],
    });

    const dockerComposeFileContent = YAML.stringify(dockerComposeObj);
    fs.writeFileSync(
      microserviceDir + "/docker-compose.yml",
      dockerComposeFileContent
    );

    console.log(
      "Successfully created project for Backk microservice '" +
        microserviceName +
        "' in directory: " +
        microserviceDir
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = createMicroserviceProject;
