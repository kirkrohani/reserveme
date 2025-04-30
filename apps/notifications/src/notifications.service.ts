import { Injectable, Logger } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  protected readonly logger: Logger = new Logger(NotificationsService.name);

  async notifyEmail({ email }: NotifyEmailDto) {
    this.logger.log(`\n---------->  notifyEmail() ${email}`);
  }
}
