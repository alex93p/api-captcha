import { ApiProperty } from '@nestjs/swagger';

class Context {
  @ApiProperty({ description: 'Child error', example: 'abc' })
  child: string;
  @ApiProperty({ description: 'Label error', example: 'data.abc' })
  label: string;
  @ApiProperty({ description: 'value error', example: '' })
  value: string;
  @ApiProperty({ description: 'Key error', example: 'abc' })
  key: string;
}
class Error {
  @ApiProperty({ description: 'Messaggio di errore', example: '"data.abc" is not allowed' })
  message: string;
  @ApiProperty({ description: "Percorso dell' errore", example: ['data', 'abc'] })
  path: Array<string>;
  @ApiProperty({ description: 'Tipo di errore', example: 'object.unknown' })
  type: string;
  @ApiProperty({ description: "Contesto dell' errore", type: Context })
  context: Context;
}

export class BadRequest {
  @ApiProperty({ enum: [400] })
  statusCode: 400;
  @ApiProperty({ description: 'Schema di descrizione errore', type: Error })
  response: Error;
  @ApiProperty({ example: '2021-10-05T14:25:46.804Z' })
  timestamp: Date;
  @ApiProperty({ example: '/api/v1/resource-path' })
  path: string;
}

export class Unauthorized {
  @ApiProperty({ enum: [401] })
  statusCode: 401;
  @ApiProperty({ description: 'Unauthorized', enum: ['Unauthorized'] })
  message: string;
}

export class Forbidden {
  @ApiProperty({ enum: [403] })
  statusCode: 403;
  @ApiProperty({ description: 'Forbidden', enum: ['Forbidden'] })
  message: string;
}

export class NotFound {
  @ApiProperty({ enum: [404] })
  statusCode: 404;
  @ApiProperty({ description: 'Risorsa non trovata', example: 'Risorsa non trovata' })
  message: string;
}

export class UnprocessableEntity {
  @ApiProperty({ enum: [422] })
  statusCode: 422;
  @ApiProperty({ description: 'Unprocessable Entity', enum: ['Unprocessable Entity'] })
  message: string;
}

export class TooManyRequests {
  @ApiProperty({ enum: [429] })
  statusCode: 429;
  @ApiProperty({ description: 'Too Many Requests', enum: ['Too Many Requests'] })
  message: string;
}

export class InternalServerError {
  @ApiProperty({ enum: [500] })
  statusCode: 500;
  @ApiProperty({ description: 'Internal server error', enum: ['Internal server error'] })
  message: string;
}
