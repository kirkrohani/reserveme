import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentCardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsCreditCard()
  number: string;

  token: string;
}
