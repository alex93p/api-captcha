import { Controller, Get, UseInterceptors } from '@nestjs/common';
import env from './env/env';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AddDataTransformInterceptor } from './interceptors/add-data-transform/add-data-transform.interceptor';
import { DataHcRes } from './docs/api/dto/response-data.openapi.dto';

@UseInterceptors(AddDataTransformInterceptor)
@Controller('healthz')
export class AppController {
  @ApiTags('Health check')
  @ApiOperation({ summary: 'Health check' })
  @ApiConsumes()
  @ApiProduces('application/json')
  @ApiOkResponse({ type: DataHcRes })
  @Get('')
  healthz(): string {
    return env.VERSION;
  }
}
