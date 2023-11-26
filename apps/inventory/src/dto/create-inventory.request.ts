import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateInventoryRequest {
  @IsString()
  @IsNotEmpty()
  iCode: string;

  @IsString()
  @IsNotEmpty()
  ingredient: string;

  @IsString()
  @IsNotEmpty()
  measurement: string;

  @IsNumber()
  beginning: number;

  @IsNumber()
  added: number;

  @IsNumber()
  deducted: number;
}
