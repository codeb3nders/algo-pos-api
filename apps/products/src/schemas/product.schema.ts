import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false })
export class Product extends AbstractDocument {
  @Prop()
  code: string;

  @Prop()
  category: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop()
  compositions?: Array<{
    stockName: string;
    measureUnit: string;
    quantity: number;
  }>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
