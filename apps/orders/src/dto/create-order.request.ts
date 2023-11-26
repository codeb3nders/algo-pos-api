import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderRequest {
  @IsArray()
  @IsNotEmpty()
  orders: Array<object>;
}
