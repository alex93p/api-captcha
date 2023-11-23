import { Controller, Post, Body, Param, Put, InternalServerErrorException, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CaptchaService, SERVICE_CODE } from './captcha.service';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { InternalServerError, NotFound } from '../../docs/api/response-codes.openapi';
import { CreateCaptchaChallengeDto, VerifyCaptchaChallengeDto } from './dto/request-data.dto';
import { JoiValidationPipe } from '../../pipes/validation/validation.pipe';
import { createCaptchaChallengeSchema } from './validations/create-captcha-challenge.schema';
import { verificationCaptchaChallengeSchema } from './validations/verification-captcha-challenge.schema';
import { AddDataTransformInterceptor } from '../../interceptors/add-data-transform/add-data-transform.interceptor';
import { DataCreateCaptchaChallenge, DataVerifyCaptchaChallenge } from '../../docs/api/dto/request-data.openapi.dto';
import { DataCaptchaChallengeRes, DataCaptchaVerificationRes } from '../../docs/api/dto/response-data.openapi.dto';

@ApiInternalServerErrorResponse({ type: InternalServerError })
@UseInterceptors(AddDataTransformInterceptor)
@Controller({ path: 'captcha', version: '1' })
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @ApiTags('Captcha challenge')
  @ApiOperation({ summary: 'Create a captcha challenge' })
  @ApiConsumes('application/json')
  @ApiBody({ type: DataCreateCaptchaChallenge })
  @ApiProduces('application/json')
  @ApiCreatedResponse({ type: DataCaptchaChallengeRes })
  @Post('')
  async createChallenge(@Body(new JoiValidationPipe(createCaptchaChallengeSchema)) createCaptchaChallengeDto: WithData<CreateCaptchaChallengeDto>) {
    const { data, code } = await this.captchaService.createChallenge(createCaptchaChallengeDto.data);
    switch (code) {
      case SERVICE_CODE.OK:
        return data;
      case SERVICE_CODE.CREATION_ERROR:
        throw new InternalServerErrorException();
    }
  }

  @ApiTags('Captcha challenge')
  @ApiOperation({ summary: 'Verify a captcha challenge' })
  @ApiConsumes('application/json')
  @ApiBody({ type: DataVerifyCaptchaChallenge })
  @ApiProduces('application/json')
  @ApiOkResponse({ type: DataCaptchaVerificationRes })
  @ApiNotFoundResponse({ type: NotFound })
  @Put(':captchaID')
  async verifyChallenge(
    @Param('captchaID') captchaID: string,
    @Body(new JoiValidationPipe(verificationCaptchaChallengeSchema)) verifyCaptchaChallengeDto: WithData<VerifyCaptchaChallengeDto>
  ) {
    const { data, code } = await this.captchaService.verifyChallenge(captchaID, verifyCaptchaChallengeDto.data.text);
    switch (code) {
      case SERVICE_CODE.OK:
        return data;
      case SERVICE_CODE.NOT_FOUND:
        throw new NotFoundException();
      case SERVICE_CODE.VERIFICATION_ERROR:
        throw new InternalServerErrorException();
    }
  }
}
