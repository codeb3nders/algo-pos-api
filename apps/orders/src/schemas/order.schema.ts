import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

class OrderDetails {
  @Prop()
  itemCode: string;

  @Prop()
  name: string;

  @Prop()
  price: number;
}

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  orderId: string;

  @Prop()
  customerName: string;

  @Prop()
  date: Date;

  @Prop()
  paymentDate: Date;

  @Prop()
  typeOfPayment: string;

  @Prop()
  orderDetails: OrderDetails[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
