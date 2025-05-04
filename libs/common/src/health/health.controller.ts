import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/')
export class HealthController {
  protected readonly logger: Logger = new Logger(HealthController.name);

  @Get()
  getHealth() {
    this.logger.log('Performing Health Check....');
    return 'Health check successful...';
  }
}
