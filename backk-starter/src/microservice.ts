import {
  JwtAuthorizationServiceImpl,
  Microservice,
  MongoDbDataStore,
  MySqlDataStore,
  NullDataStore,
  PostgreSqlDataStore
} from 'backk';
import AuditLoggingServiceImpl from './services/auditlogging/AuditLoggingServiceImpl';
import CaptchaVerificationServiceImpl from './services/captchaverification/CaptchaVerifyServiceImpl';
import ExampleServiceImpl from './services/example/ExampleServiceImpl';
import LivenessCheckServiceImpl from './services/livenesscheck/LivenessCheckServiceImpl';
import ReadinessCheckServiceImpl from './services/readinesscheck/ReadinessCheckServiceImpl';
import ResponseCacheConfigServiceImpl from './services/responsecacheconfig/ResponseCacheConfigServiceImpl';
import StartupCheckServiceImpl from "./services/startupcheck/StartupCheckServiceImpl";

// const dataStore = new MySqlDataStore();
// const dataStore = new PostgreSqlDataStore();
// const dataStore = new MongoDbDataStore();
// const dataStore = new NullDataStore();

// noinspection JSUnusedLocalSymbols
class MicroserviceImpl extends Microservice {
  private readonly auditLoggingService = new AuditLoggingServiceImpl();
  private readonly authorizationService = new JwtAuthorizationServiceImpl();
  private readonly captchaVerificationService = new CaptchaVerificationServiceImpl();
  private readonly livenessCheckService = new LivenessCheckServiceImpl(dataStore);
  private readonly readinessCheckService = new ReadinessCheckServiceImpl(this);
  private readonly startupCheckService = new StartupCheckServiceImpl(dataStore);
  private readonly responseCacheConfigService = new ResponseCacheConfigServiceImpl();

  // TODO: Create your service(s) classes under services directory and instantiate them here
  private readonly exampleService = new ExampleServiceImpl(dataStore);

  constructor() {
    super(dataStore);
  }
}

const microservice = new MicroserviceImpl();
export default microservice;
