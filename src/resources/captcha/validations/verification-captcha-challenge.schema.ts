import Joi from 'joi';
import { VerifyCaptchaChallengeDto } from '../dto/request-data.dto';
import env from '../../../env/env';

export const verificationCaptchaChallengeSchema = Joi.object({
  data: Joi.object<VerifyCaptchaChallengeDto, true>({
    text: Joi.string().min(parseInt(env.CAPTCHA_CONFIG.MIN_SIZE)).max(parseInt(env.CAPTCHA_CONFIG.MAX_SIZE)).required(),
  })
    .unknown(false)
    .required(),
}).unknown(false);
