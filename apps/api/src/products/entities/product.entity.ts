import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { uuid } from '../../utils/data/uuid';

@Schema()
export class Products extends AbstractDocument {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  group: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop()
  description: string;

  @Prop({ type: JSON })
  linkInventory: object;

  @Prop({ default: Date.now() })
  createdAt: number;

  @Prop()
  updatedAt?: Date;
}

export type ProductsDocument = Products & Document;
export const ProductsSchema = SchemaFactory.createForClass(Products);
