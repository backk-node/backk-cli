import {AllowForEveryUser, DataStore, DefaultStartupCheckServiceImpl, PromiseErrorOr} from 'backk';

export default class StartupCheckServiceImpl extends DefaultStartupCheckServiceImpl {
  constructor(dataStore: DataStore) {
    super(dataStore);
  }

  @AllowForEveryUser(false)
  isMicroserviceStarted(): PromiseErrorOr<null> {
    return super.isMicroserviceStarted();
  }
}
