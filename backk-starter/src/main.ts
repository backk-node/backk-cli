// organize-imports-ignore
import 'reflect-metadata';
import { HttpServer, initializeDefaultJaegerTracing, KafkaConsumer, RedisConsumer } from 'backk';
import microservice from './microservice';

initializeDefaultJaegerTracing();

microservice.start([new HttpServer(), new KafkaConsumer(), new RedisConsumer()]);
