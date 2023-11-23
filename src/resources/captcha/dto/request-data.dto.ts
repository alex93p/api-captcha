import { ApiProperty } from '@nestjs/swagger';
import env from '../../../env/env';

export class CreateCaptchaChallengeDto {
  @ApiProperty({ required: false, minimum: parseInt(env.CAPTCHA_CONFIG.MIN_SIZE), maximum: parseInt(env.CAPTCHA_CONFIG.MAX_SIZE) })
  size?: number;
  @ApiProperty({ required: false })
  width?: number;
  @ApiProperty({ required: false })
  height?: number;
}

export class VerifyCaptchaChallengeDto {
  @ApiProperty({ required: true, nullable: false, minLength: parseInt(env.CAPTCHA_CONFIG.MIN_SIZE), maxLength: parseInt(env.CAPTCHA_CONFIG.MAX_SIZE) })
  text: string;
}
