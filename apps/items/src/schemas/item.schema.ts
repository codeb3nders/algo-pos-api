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

/**
 _id: '6563173cd6d85255804737e50',
      category: 'frappe',
      item: 'java chip frppe',
      image: '',
      color: '',
      option: '22oz',
      price: 120,
      cost: 10,
      modifier: 5,
      onlineStoreAvailability: true,
      onlineStoreDescription: 'some description',
      VATExempt: true,
      variants: [
        { name: 'v16 oz', price: 90 },
        { name: 'v22 oz', price: 120 },
      ],
      customer: 'JM',

       */
