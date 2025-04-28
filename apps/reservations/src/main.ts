import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  await app.listen(process.env.port ?? PORT);
  console.log(
    `*********** Reservations App listening on port ${PORT} ************`,
  );
}
bootstrap();
