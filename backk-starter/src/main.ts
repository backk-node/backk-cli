// organize-imports-ignore
import 'reflect-metadata';
import { HttpServer, initializeDefaultJaegerTracing } from 'backk';
import microservice from './microservice';

initializeDefaultJaegerTracing();

microservice.start([
  // TODO: Enable HTTP server and/or consumer(s)
  new HttpServer(),
  // new KafkaConsumer(),
  // new RedisConsumer()
]);
