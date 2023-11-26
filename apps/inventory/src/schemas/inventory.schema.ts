import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Inventory extends AbstractDocument {
  @Prop()
  iCode: string;

  @Prop()
  ingredient: string;

  @Prop()
  measurement: string;

  @Prop()
  beginning: number;

  @Prop()
  added: number;

  @Prop()
  deducted: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
