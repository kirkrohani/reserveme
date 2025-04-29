import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { PaymentCardDto } from './payment-card.dto';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  card: PaymentCardDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
