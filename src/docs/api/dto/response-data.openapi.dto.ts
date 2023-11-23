import { ApiProperty } from '@nestjs/swagger';
import env from '../../../env/env';
import { CaptchaChallenge } from '../../../resources/captcha/dto/response-data.dto';

export class DataCaptchaChallengeRes {
  @ApiProperty({ type: CaptchaChallenge })
  data: CaptchaChallenge;
}

export class DataCaptchaVerificationRes {
  @ApiProperty({ required: true, nullable: false })
  data: boolean;
}

export class DataHcRes {
  @ApiProperty({ required: true, nullable: false, description: 'API version', example: env.VERSION })
  data: string;
}
