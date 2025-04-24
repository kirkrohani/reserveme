import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  await app.listen(process.env.port ?? configService.get('PORT'));
  console.log(`********** Auth App listening on port ${PORT} **********`);
}
bootstrap();
