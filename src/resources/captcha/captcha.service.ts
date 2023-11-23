import { Inject, Injectable, Logger } from '@nestjs/common';
import { CaptchaGeneratorService } from '../../services/captcha-generator/captcha-generator.service';
import { CreateCaptchaChallengeDto } from './dto/request-data.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 } from 'uuid';
import { CaptchaChallenge } from './dto/response-data.dto';
import * as console from 'console';

export enum SERVICE_CODE {
  OK,
  NOT_FOUND,
  CREATION_ERROR,
  VERIFICATION_ERROR,
}

@Injectable()
export class CaptchaService {
  constructor(
    private readonly captchaGeneratorService: CaptchaGeneratorService,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async createChallenge(createCaptchaChallengeDto: CreateCaptchaChallengeDto): Promise<ServiceResponse<CaptchaChallenge, SERVICE_CODE.OK | SERVICE_CODE.CREATION_ERROR>> {
    try {
      const { data, text } = this.captchaGeneratorService.create(createCaptchaChallengeDto);
      const captchaID = v4();
      await this.setCaptchaChallenge(captchaID, text);
      // todo: remove next line
      console.info(`Captcha ID: ${captchaID}\nVerification text: ${text}`); // N.B => just for the purpose of the exercise
      return {
        data: {
          captchaID: captchaID,
          imageDataSvg: encodeURI(data),
        },
        code: SERVICE_CODE.OK,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        data: null,
        code: SERVICE_CODE.CREATION_ERROR,
      };
    }
  }

  async verifyChallenge(captchaID: string, textResponse: string): Promise<ServiceResponse<boolean, SERVICE_CODE.OK | SERVICE_CODE.NOT_FOUND | SERVICE_CODE.VERIFICATION_ERROR>> {
    try {
      const challenge = await this.getCaptchaChallenge(captchaID);
      if (!challenge)
        return {
          data: null,
          code: SERVICE_CODE.NOT_FOUND,
        };
      // remove challenge from db in order to mitigate brute forcing (if challenge fails) and re-use challenge id (if challenge success)
      await this.deleteCaptchaChallenge(captchaID);
      return {
        data: textResponse === challenge,
        code: SERVICE_CODE.OK,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        data: null,
        code: SERVICE_CODE.VERIFICATION_ERROR,
      };
    }
  }

  private async setCaptchaChallenge(key: string, payload: string): Promise<void> {
    await this.cacheManager.set(key, payload);
  }

  private async getCaptchaChallenge(key: string): Promise<string | undefined> {
    return await this.cacheManager.get(key);
  }

  private async deleteCaptchaChallenge(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
