import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop(SchemaTypes.Date)
  timestamp: Date;

  @Prop(SchemaTypes.Date)
  startDate: Date;

  @Prop(SchemaTypes.Date)
  endDate: Date;

  @Prop(SchemaTypes.String)
  userId: string;

  @Prop(SchemaTypes.String)
  placeId: string;

  @Prop(SchemaTypes.String)
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
