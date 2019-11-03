import { httpListener } from "@marblejs/core";
import { logger$ } from "@marblejs/middleware-logger";
import { bodyParser$ } from "@marblejs/middleware-body";
import { auth$ } from "./effects/auth.effects";

const middlewares = [
  logger$(),
  bodyParser$()
  // ...
];

const effects = [
  auth$
  // endpoint2$
  // ...
];

export default httpListener({ middlewares, effects });
