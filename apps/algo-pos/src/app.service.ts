import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('INVENTORY_SERVICE') private client: ClientProxy) {}

  async getHello() {
    return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  }

  async getHelloAsync() {
    const message = await this.client.send(
      { cmd: 'inventory_que' },
      'JM Copino, the Progressive Coder===',
    );
    return message;
  }
}
