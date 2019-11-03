import { r } from "@marblejs/core";
import { concatMap, mapTo } from "rxjs/operators";
import { headerToken } from "../context/index";

export const auth$ = r.pipe(
  r.matchPath("/auth"),
  r.matchType("GET"),
  r.useEffect((req$, _, { ask }) =>
    ask(headerToken)
      .toNullable()!
      .pipe(concatMap(oauthUrl => req$.pipe(mapTo({ body: oauthUrl }))))
  )
);
