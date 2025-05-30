import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  protected readonly logger: Logger = new Logger(PaymentsService.name);

  private readonly stripeClient = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2025-03-31.basil',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  /**
   * CREATE CHARGE function
   * @param pamount of charge and email address associated with the payment
   * @returns  Promise<Stripe.Response<Stripe.PaymentIntent>
   */
  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_mastercard' },
    });

    const paymentIntent = this.stripeClient.paymentIntents.create({
      amount: amount * 100,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      confirm: true,
      payment_method: paymentMethod.id,
      currency: 'usd',
    });
    this.logger.log(
      '\n---------------------> Payments Service charge successfully created ',
      paymentIntent,
    );
    this.notificationsService.emit('notify-email', {
      email,
      message: `Your payment of $${amount} has been completed successfully.`,
    });
    return paymentIntent;
  }
}
