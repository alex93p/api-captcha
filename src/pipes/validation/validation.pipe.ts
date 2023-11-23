import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AnySchema } from 'joi';

@Injectable()
export class JoiValidationPipe<T = any, R = any> implements PipeTransform<T, R> {
  constructor(private schema: AnySchema<R>) {}

  transform(input: any, metadata: ArgumentMetadata) {
    const { value, error } = this.schema.validate(input);
    if (error) throw new BadRequestException(error.details[0]);
    return value;
  }
}
