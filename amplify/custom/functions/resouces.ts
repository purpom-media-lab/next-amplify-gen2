import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Duration } from "aws-cdk-lib";
import * as path from "path";
import { fileURLToPath } from "url";

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
