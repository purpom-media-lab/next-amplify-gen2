# next-amplify-gen2

apps・packagesのモノレポ構成

[参考](https://docs.amplify.aws/gen2/deploy-and-host/fullstack-branching/monorepos/)

## apps

NextJS Approuterのソースコード

## packages

### shared-backend

```
├── amplify
│   │ 
│   ├── custom
│   │   └── function
│  	│  	 └──  resources ← Lambdaのリソース定義はここに書く
│   ├── auth ...
│   │
│   ├── data ...
│   │
│   ├── function-sources <-- NestJSのコードはここに書く
│   │   ├── apps ...
│   │   ├── libs ...
│   │   └── package.json
│   │
│   ├── backend.ts
│   ├── package.json
│   ├── src/
│   ├── tsconfig.json
│   └── yarn.lock
│ 
├── package.json
└── yarn.lock
```


`amplify/custom/functions/resouces.ts`内で以下のように定義

```typescript
import * as path from "path";
import { fileURLToPath } from "url";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { CfnUserPool } from "aws-cdk-lib/aws-cognito";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CustomFunctions extends Construct {
  constructor(scope: Construct, id: string, userPool: CfnUserPool) {
    super(scope, id);

    const cognitoCustomMessageTrigger = new lambda.DockerImageFunction(
      this,
      "CustomMessageTrigger",
      {
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "../../function-sources"),
          {
            file: "CognitoCustomMessageTrigger.Dockerfile",
            platform: Platform.LINUX_AMD64,
          }
        ),
        timeout: Duration.seconds(30),
        memorySize: 512,
      }
    );

    cognitoCustomMessageTrigger.grantInvoke(
      new iam.ServicePrincipal("cognito-idp.amazonaws.com")
    );

    const kmsKey = new kms.Key(this, "AuthKmsKey", {
      description: "Required by Cognito",
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Lambda Triggerの設定
    userPool.lambdaConfig = {
      customEmailSender: {
        lambdaArn: cognitoCustomMessageTrigger.functionArn,
        lambdaVersion: "V1_0",
      },
      kmsKeyId: kmsKey.keyArn,
    };
  }
}


```

