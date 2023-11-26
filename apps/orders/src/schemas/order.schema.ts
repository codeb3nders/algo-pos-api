import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  itemCode: string;

  @Prop()
  name: string;

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
