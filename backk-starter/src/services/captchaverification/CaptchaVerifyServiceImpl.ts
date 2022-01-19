import { CaptchaVerificationService } from 'backk';

export default class CaptchaVerificationServiceImpl extends CaptchaVerificationService {
  verifyCaptcha(): Promise<boolean> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'integration') {
      return Promise.resolve(true);
    } else {
      // TODO: Verify captcha with an API call to your Captcha service provider, e.g. using makeHttpRequest()
      throw new Error('Captcha verification service is not implemented');
    }
  }
}
