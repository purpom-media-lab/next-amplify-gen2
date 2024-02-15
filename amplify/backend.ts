import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { myDemoFunction } from "./functions/test-function/test";
import { CustomFunction } from "./custom/functions/resouces";

const backend = defineBackend({
  auth,
  data,
  myDemoFunction,
});

new CustomFunction(
  backend.createStack("CustomFunction"),
  "CustomFunction"
);
