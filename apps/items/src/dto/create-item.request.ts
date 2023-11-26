import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateItemRequest {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  item: string;

  @IsString()
  @IsNotEmpty()
  option: string;

  @IsPositive()
  price: number;

  @IsPositive()
  cost: number;

  @IsPositive()
  modifier: number;

  @IsBoolean()
  onlineStoreAvailability: boolean;

  @IsString()
  onlineStoreDescription: string;

  @IsBoolean()
  VATExempt: boolean;

  @IsArray()
  linkInventory: Array<string>;
}
