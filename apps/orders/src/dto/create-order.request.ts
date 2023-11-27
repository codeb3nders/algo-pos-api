import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

class OrderItem {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsNumber()
  qty: number;
}

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  customerName: string;

  @IsDateString()
  date: Date;

  @IsDateString()
  paymentDate: Date;

  @IsString()
  typeOfPayment: string;

  @IsArray()
  @IsNotEmpty()
  orderDetails: Array<OrderItem>;
}
