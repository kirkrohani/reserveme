import { Injectable, Logger } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ReservationsController } from 'apps/reservations/src/reservations.controller';

@Injectable()
export class NotificationsService {
  protected readonly logger: Logger = new Logger(ReservationsController.name);

  async notifyEmail({ email }: NotifyEmailDto) {
    this.logger.log('\n----------> Notifications Service notifyEmail()', email);
  }
}
