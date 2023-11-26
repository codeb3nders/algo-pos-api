import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item extends AbstractDocument {
  @Prop()
  category: string;

  @Prop()
  item: string;

  @Prop()
  option: string;

  @Prop()
  price: number;

  @Prop()
  cost: number;

  @Prop()
  modifier: number;

  @Prop()
  onlineStoreAvailability: boolean;

  @Prop()
  onlineStoreDescription: string;

  @Prop()
  VATExempt: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
