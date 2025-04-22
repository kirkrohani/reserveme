import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false })
export class UsersDocument extends AbstractDocument {
  @Prop(SchemaTypes.String)
  email: string;

  @Prop(SchemaTypes.String)
  password: string;

  @Prop(SchemaTypes.String)
  firstName: string;

  @Prop(SchemaTypes.String)
  lastName: string;
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
