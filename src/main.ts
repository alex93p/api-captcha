import 'dotenv/config';
import env from './env/env';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
        },
      },
    })
  );
  app.use(json({ limit: '1kb' }));
  app.use(urlencoded({ extended: true, limit: '1kb' }));
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['healthz'] });
  app.enableVersioning({ type: VersioningType.URI });

  if (env.NODE_ENV === 'dev') {
    const config = new DocumentBuilder().setTitle(env.SERVICE_NAME).setVersion(env.VERSION).addServer(env.SERVER.URL).build();
    const documentOptions: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) => [env.SERVICE_NAME, controllerKey, methodKey].join('_'),
    };
    const document = SwaggerModule.createDocument(app, config, documentOptions);
    SwaggerModule.setup('docs/openapi', app, document);
    writeFileSync(resolve(process.cwd(), 'docs/api/openapi.json'), JSON.stringify(document, null, 2), { encoding: 'utf8' });
  }

  await app.listen(env.SERVER.PORT);
}

bootstrap();
