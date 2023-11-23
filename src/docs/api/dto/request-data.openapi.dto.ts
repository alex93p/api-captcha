import { ApiProperty } from '@nestjs/swagger';
import { CreateCaptchaChallengeDto, VerifyCaptchaChallengeDto } from '../../../resources/captcha/dto/request-data.dto';

export class DataCreateCaptchaChallenge {
  @ApiProperty({ type: CreateCaptchaChallengeDto })
  data: CreateCaptchaChallengeDto;
}

export class DataVerifyCaptchaChallenge {
  @ApiProperty({ type: VerifyCaptchaChallengeDto })
  data: VerifyCaptchaChallengeDto;
}
