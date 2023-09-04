import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AbstractDocument } from '@app/shared';

@Schema()
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  accountId: string;

  @Prop()
  access: string;

  @Prop({ default: Date.now() })
  createdAt: number;

  @Prop()
  updatedAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
