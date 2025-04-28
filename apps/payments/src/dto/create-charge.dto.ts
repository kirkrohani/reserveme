import { IsNotEmpty, IsNumber } from 'class-validator';
import Stripe from 'stripe';

export class CreateChargeDto {
  @IsNotEmpty()
  card: Stripe.PaymentMethodCreateParams.Card;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
