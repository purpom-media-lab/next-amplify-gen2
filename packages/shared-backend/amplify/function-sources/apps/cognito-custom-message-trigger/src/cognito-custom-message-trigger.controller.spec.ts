import { Test, TestingModule } from '@nestjs/testing';
import { CognitoCustomMessageTriggerController } from './cognito-custom-message-trigger.controller';
import { CognitoCustomMessageTriggerService } from './cognito-custom-message-trigger.service';

describe('CognitoCustomMessageTriggerController', () => {
  let cognitoCustomMessageTriggerController: CognitoCustomMessageTriggerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CognitoCustomMessageTriggerController],
      providers: [CognitoCustomMessageTriggerService],
    }).compile();

    cognitoCustomMessageTriggerController =
      app.get<CognitoCustomMessageTriggerController>(
        CognitoCustomMessageTriggerController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cognitoCustomMessageTriggerController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
