import { combineLatest, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

import { auth$ } from "./auth";
import { version$ } from "./version";

const source$ = combineLatest(version$, auth$).pipe(
  map(args => {
    const [version, { oauthUrl, uid }] = args;
    return { version: version, oauthUrl: oauthUrl, uid: uid };
  })
);
export const meta = new ReplaySubject<{
  version: string;
  oauthUrl: string;
  uid: string;
}>(1);
source$.subscribe(meta);
