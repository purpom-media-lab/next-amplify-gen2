import { NestFactory } from '@nestjs/core';
import { CognitoCustomMessageTriggerModule } from './cognito-custom-message-trigger.module';

async function bootstrap() {
  const app = await NestFactory.create(CognitoCustomMessageTriggerModule);
  await app.listen(3000);
}
bootstrap();
