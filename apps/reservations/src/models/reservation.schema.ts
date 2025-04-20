import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.Date })
  timeStamp: Date;

  @Prop({ type: SchemaTypes.Date })
  startDate: Date;

  @Prop({ type: SchemaTypes.Date })
  endDate: Date;

  @Prop({ type: SchemaTypes.Date })
  userId: string;

  @Prop({ type: SchemaTypes.String })
  placeId: string;

  @Prop({ type: SchemaTypes.String })
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
