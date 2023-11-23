import { Logger, Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { CaptchaGeneratorService } from '../../services/captcha-generator/captcha-generator.service';

@Module({
  controllers: [CaptchaController],
  providers: [Logger, CaptchaGeneratorService, CaptchaService],
})
export class CaptchaModule {}
