import { Controller, Get } from '@nestjs/common';
import { CognitoCustomMessageTriggerService } from './cognito-custom-message-trigger.service';

@Controller()
export class CognitoCustomMessageTriggerController {
  constructor(
    private readonly cognitoCustomMessageTriggerService: CognitoCustomMessageTriggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.cognitoCustomMessageTriggerService.getHello();
  }
}
