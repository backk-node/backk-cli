docker-compose --env-file .env.ci run wait-for-services-ready -c microservice:3001 -t 600
newman run generated/integrationtests/integrationTestsPostmanCollection.json
