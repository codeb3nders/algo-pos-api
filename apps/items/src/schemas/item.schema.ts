import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item extends AbstractDocument {
  @Prop()
  itemCode: string;

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

  @Prop()
  linkInventory: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
