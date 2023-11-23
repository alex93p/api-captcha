import { ApiProperty } from '@nestjs/swagger';

export class CaptchaChallenge {
  @ApiProperty({ required: true, nullable: false })
  captchaID: string;
  @ApiProperty({ required: true, nullable: false, description: 'SVG url encoded' })
  imageDataSvg: string;
}
