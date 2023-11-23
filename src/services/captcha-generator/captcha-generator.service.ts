import { Injectable } from '@nestjs/common';
import { create, ConfigObject, CaptchaObj } from 'svg-captcha';

@Injectable()
export class CaptchaGeneratorService {
  create(config: ConfigObject): CaptchaObj {
    return create(config);
  }
}
