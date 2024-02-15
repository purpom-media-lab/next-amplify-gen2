import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Duration } from "aws-cdk-lib";

export class CustomFunction extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const base = new Construct(this, "WebAdapter");
    const handler = new lambda.DockerImageFunction(base, "Handler", {
      code: lambda.DockerImageCode.fromImageAsset("./test", {
        file: "Dockerfile",
        platform: Platform.LINUX_AMD64,
      }),
      timeout: Duration.seconds(30),
    });
  }
}
