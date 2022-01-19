import {
  AllowForEveryUser,
  CrudEntityService,
  DataStore,
  DefaultPostQueryOperationsImpl,
  Many,
  NoCaptcha,
  One,
  PromiseErrorOr,
  _Id,
} from 'backk';
import { exampleServiceErrors } from './errors/exampleServiceErrors';
import { ExampleService } from './ExampleService';
import ExampleEntity from './types/entities/ExampleEntity';

export default class ExampleServiceImpl extends CrudEntityService implements ExampleService {
  constructor(dataStore: DataStore) {
    super(exampleServiceErrors, dataStore);
  }

  @AllowForEveryUser(false)
  deleteAllExampleEntities(): PromiseErrorOr<null> {
    return this.dataStore.deleteAllEntities(ExampleEntity);
  }

  @AllowForEveryUser(false)
  @NoCaptcha('Not public interface')
  createExampleEntity(exampleEntity: ExampleEntity): PromiseErrorOr<One<ExampleEntity>> {
    return this.dataStore.createEntity(ExampleEntity, exampleEntity);
  }

  @AllowForEveryUser(false)
  getExampleEntities(
    postQueryOperations: DefaultPostQueryOperationsImpl
  ): PromiseErrorOr<Many<ExampleEntity>> {
    return this.dataStore.getAllEntities(ExampleEntity, postQueryOperations, false);
  }

  @AllowForEveryUser(false)
  getExampleEntity({ _id }: _Id): PromiseErrorOr<One<ExampleEntity>> {
    return this.dataStore.getEntityById(ExampleEntity, _id, new DefaultPostQueryOperationsImpl(), false);
  }

  @AllowForEveryUser(false)
  updateExampleEntity(exampleEntity: ExampleEntity): PromiseErrorOr<null> {
    return this.dataStore.updateEntity(ExampleEntity, exampleEntity);
  }

  @AllowForEveryUser(false)
  deleteExampleEntity({ _id }: _Id): PromiseErrorOr<null> {
    return this.dataStore.deleteEntityById(ExampleEntity, _id);
  }
}
