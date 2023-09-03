import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/shared/auth/services';
import { catchError, tap } from 'rxjs';
import { BILLING_SERVICE } from '../constants/services';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  getHello(): string {
    console.log('getHello');
    this.billingClient.emit('order_created', {
      request_id: '1234567890',
      Authentication: 'authentication',
    });
    return 'Hello from orders.';
  }

  async getOrders() {
    console.log('getOrders');
    this.authClient
      .emit('validate_user', {
        Authentication: 'authentication',
      })
      .pipe(
        tap((res) => {
          console.log('res ---------> ----->', res);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
    return this.ordersRepository.find({});
  }
}
