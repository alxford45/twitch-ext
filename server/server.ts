import {
  createServer,
  HttpServerEffect,
  matchEvent,
  ServerEvent,
  bindTo
} from "@marblejs/core";
import httpListener from "./http.listener";
import { tap, map } from "rxjs/operators";
import { merge } from "rxjs";
import {
  auth,
  authToken,
  generateUiid,
  generateUuidToken,
  header,
  headerToken,
  version,
  versionToken
} from "./context/index";

const listening$: HttpServerEffect = (event$, ..._) =>
  event$.pipe(
    matchEvent(ServerEvent.listening),
    map(event => event.payload),
    tap(({ port, host }) =>
      console.log(`server listening on http://${host}:${port}`)
    )
  );
export const server = createServer({
  port: 1337,
  hostname: "localhost",
  httpListener,
  event$: (...args) => merge(listening$(...args)),
  dependencies: [
    bindTo(versionToken)(version),
    bindTo(generateUuidToken)(generateUiid),
    bindTo(authToken)(auth),
    bindTo(headerToken)(header)
  ]
});
