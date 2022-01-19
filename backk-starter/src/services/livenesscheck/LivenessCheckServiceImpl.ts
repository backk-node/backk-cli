import { AllowForEveryUser, DataStore, LivenessCheckService, PromiseErrorOr } from 'backk';

export default class LivenessCheckServiceImpl extends LivenessCheckService {
  constructor(dataStore: DataStore) {
    super({}, dataStore);
  }

  @AllowForEveryUser(false)
  isMicroserviceAlive(): PromiseErrorOr<null> {
    return Promise.resolve([null, null]);
  }
}
