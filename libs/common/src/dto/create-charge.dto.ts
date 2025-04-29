import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { PaymentCardDto } from './payment-card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentCardDto)
  card: PaymentCardDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
