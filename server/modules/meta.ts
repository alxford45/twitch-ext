import { combineLatest, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

import { auth$ } from "./auth";
import { version$ } from "./version";

/**
 * [[Observable]]<version: string, oauthUrl: string, uid: string> created by combining the
 * observables [[version$]] (observable<string>) and [[auth$]] (observable<[[RuneliteAuthResponse]]>)
 * using [[combineLatest]] to emit the latest values of version, oauthUrl and uid.
 *
 * Version and uid will be used on all future request, and oauthUrl will be needed for initial authentication.
 */
const source$ = combineLatest(version$, auth$).pipe(
  map(args => {
    const [version, { oauthUrl, uid }] = args;
    return { version: version, oauthUrl: oauthUrl, uid: uid };
  })
);
/**
 * Meta is exported as a [[ReplaySubject]] from [[source$]] so that all future request after authentication have
 * access to the latest emitted value. By wrapping the source observable in a replay subject, all future subscriptions
 * will NOT recalculate the uid value. This is necessary because only uid value authenticated will be valid.
 */
export const meta = new ReplaySubject<{
  version: string;
  oauthUrl: string;
  uid: string;
}>(1);
/**
 * source$ is immediately subscribed to meta so that all future subscriptions of meta are initialized
 * with the source$ subscription.
 */
source$.subscribe(meta);
