import Joi from 'joi';
import { CreateCaptchaChallengeDto } from '../dto/request-data.dto';
import env from '../../../env/env';

export const createCaptchaChallengeSchema = Joi.object({
  data: Joi.object<CreateCaptchaChallengeDto, true>({
    size: Joi.number().min(parseInt(env.CAPTCHA_CONFIG.MIN_SIZE)).max(parseInt(env.CAPTCHA_CONFIG.MAX_SIZE)).optional(),
    width: Joi.number().positive().optional(),
    height: Joi.number().positive().optional(),
  })
    .unknown(false)
    .required(),
}).unknown(false);
