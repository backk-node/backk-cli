import { ResponseCacheConfigService } from 'backk';

export default class ResponseCacheConfigServiceImpl extends ResponseCacheConfigService {
  getCachingDurationInSecs(serviceFunctionName: string, serviceFunctionArgument: any): number {
    // TODO: implement caching duration
    return 60;
  }

  shouldCacheServiceFunctionCallResponse(serviceFunctionName: string, serviceFunctionArgument: any): boolean {
    // TODO: implement logic for caching
    return false;
  }
}
