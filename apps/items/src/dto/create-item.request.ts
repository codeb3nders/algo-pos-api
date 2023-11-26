import { IsNotEmpty, IsPositive, IsString, IsBoolean } from 'class-validator';

export class CreateItemRequest {
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
}
