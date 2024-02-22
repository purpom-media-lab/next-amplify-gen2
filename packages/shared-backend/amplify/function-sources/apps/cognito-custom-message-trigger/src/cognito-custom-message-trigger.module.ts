import { Module } from '@nestjs/common';
import { CognitoCustomMessageTriggerController } from './cognito-custom-message-trigger.controller';
import { CognitoCustomMessageTriggerService } from './cognito-custom-message-trigger.service';

@Module({
  imports: [],
  controllers: [CognitoCustomMessageTriggerController],
  providers: [CognitoCustomMessageTriggerService],
})
export class CognitoCustomMessageTriggerModule {}
