import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoCustomMessageTriggerService {
  getHello(): string {
    return 'Hello World!';
  }
}
