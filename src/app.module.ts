import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CaptchaModule } from './resources/captcha/captcha.module';
import { CaptchaGeneratorService } from './services/captcha-generator/captcha-generator.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import env from './env/env';

@Module({
  imports: [
    // Redis
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: `redis://${env.REDIS.HOST}:${env.REDIS.PORT}`,
      disableOfflineQueue: false,
      pingInterval: 50,
      ttl: 1000 * 60 * parseInt(env.REDIS.TTL),
      isGlobal: true,
    }),
    CaptchaModule,
  ],
  controllers: [AppController],
  providers: [CaptchaGeneratorService],
})
export class AppModule {}
