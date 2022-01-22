# You don't need to add database service, because Backk microservice automatically waits for it to be ready
# Syntax: docker-compose --env-file .env.ci run wait-for-services-ready -c <service1>:<port>,<service2>:port,...<serviceN>:port -t 600
# Option '-t' specifies the maximum wait time in seconds
#
# For example:
# docker-compose --env-file .env.ci run wait-for-services-ready -c kafka:9092,redis:6379,microservice:3001,other-microservice-1:8080,other-microservice-2:8080 -t 600

docker-compose --env-file .env.ci run wait-for-services-ready -c microservice:3001 -t 600
newman run generated/integrationtests/integrationTestsPostmanCollection.json
