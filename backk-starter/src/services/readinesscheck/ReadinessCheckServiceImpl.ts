import { AllowForEveryUser, DefaultReadinessCheckServiceImpl, Microservice, PromiseErrorOr } from 'backk';

export default class ReadinessCheckServiceImpl extends DefaultReadinessCheckServiceImpl {
  constructor(microservice: Microservice) {
    super(microservice);
  }

  @AllowForEveryUser(false)
  isMicroserviceReady(): PromiseErrorOr<null> {
    return super.isMicroserviceReady();
  }
}
