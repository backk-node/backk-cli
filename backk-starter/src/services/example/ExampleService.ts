import { Many, One, PostQueryOperations, PromiseErrorOr, Service, _Id } from 'backk';
import ExampleEntity from './types/entities/ExampleEntity';

export interface ExampleService extends Service {
  deleteAllExampleEntities(): PromiseErrorOr<null>;
  createExampleEntity(arg: ExampleEntity): PromiseErrorOr<One<ExampleEntity>>;
  getExampleEntities(arg: PostQueryOperations): PromiseErrorOr<Many<ExampleEntity>>;
  getExampleEntity(arg: _Id): PromiseErrorOr<One<ExampleEntity>>;
  updateExampleEntity(arg: ExampleEntity): PromiseErrorOr<null>;
  deleteExampleEntity(arg: _Id): PromiseErrorOr<null>;
}
