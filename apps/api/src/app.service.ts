import { Injectable } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('PRESENCE_SERVICE') private readonly client: ClientProxy,
  // ) {}

  getHello(): string {
    return 'Hello World!, from Inventory Service';
  }

  // async getHelloAsync() {
  //   const message = await this.client.send(
  //     { cmd: 'inventory_que' },
  //     'JM Copino, the Progressive Coder===',
  //   );
  //   return message;
  // }
}
