import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      code: 0,
      message: 'success',
      data: '刘老板牛逼',
    };
  }
}
