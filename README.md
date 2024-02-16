## 構成

### app

NextJS Approuter構成

## Backend Code

### nest-app

**NestJSのコードをamplifyディレクトリ配下**におくと、ホットデプロイ時に以下のエラー発生したのでディレクトリ外に配置。そのため、このディレクトリ配下のコードの変更によってデプロイは走らないので注意。

```shell
npx amplify sandbox
amplify/custom/functions/test/src/app.controller.ts(4,2): error TS1238: Unable to resolve signature of class decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.
amplify/custom/functions/test/src/app.controller.ts(8,3): error TS1241: Unable to resolve signature of method decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 3.
amplify/custom/functions/test/src/app.controller.ts(8,4): error TS1270: Decorator function return type 'void | TypedPropertyDescriptor<unknown>' is not assignable to type 'void | (() => string)'.
  Type 'TypedPropertyDescriptor<unknown>' is not assignable to type 'void | (() => string)'.
amplify/custom/functions/test/src/app.module.ts(5,2): error TS1238: Unable to resolve signature of class decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.
amplify/custom/functions/test/src/app.service.ts(3,2): error TS1238: Unable to resolve signature of class decorator when called as an expression.
  The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.
TypeScript validation check failed, check your backend definition

```

### amplify

`amplify/custom/functions/resouces.ts`内で以下のように定義

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {Platform} from "aws-cdk-lib/aws-ecr-assets";
import {Duration} from "aws-cdk-lib";
import * as path from "path";
import {fileURLToPath} from "url";

export class CustomFunction extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const handler = new lambda.DockerImageFunction(this, "Handler", {
            code: lambda.DockerImageCode.fromImageAsset(
                path.join(__dirname, "../../../nest-app"),
                {
                    file: "Dockerfile",
                    platform: Platform.LINUX_AMD64,
                }
            ),
            timeout: Duration.seconds(30),
        });
    }
}


```

