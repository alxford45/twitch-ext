import { AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import uuid from "uuid/v4";

import { fetchData } from "../fetchData";
import { RuneliteAuthResponse } from "../types";
import { version$ } from "./version";
/**
 * [[Observable]] created by concatinating the observable stream of [[version$]] and returning
 * a new observable from the response of [[fetchData]] to emit the uuid and oauthURL required for
 * authenticating a Runelite User.
 *
 * OauthURL is the google authentication url used by Runelite for users to "sign-in" to their
 * Runelite account.
 *
 * Uid is the a locally generated uuid that is used in the header to authenticate all future Runelite Requests.
 *
 * The uuid is "authenticated" by creating a websocket connection to Runelite with the uuid as the session id.
 * If the user is authenticated by runelite (by "signing in" with their Gmail), Runelite will send a success message
 * through the websocket and allow future requests with that uuid.
 */
export const auth$: Observable<RuneliteAuthResponse> = version$.pipe(
  concatMap((v: string) => {
    const localUuid = uuid();
    const options: AxiosRequestConfig = {
      headers: {
        "RUNELITE-AUTH": localUuid
      },
      method: "GET",
      url: `http://api.runelite.net/${v}/account/login?uuid=${localUuid}`
    };

    const response = fetchData<RuneliteAuthResponse>(options)!;
    return response;
  })
);
//export const auth = new ReplaySubject<RuneliteResponse>(0);
//source$.subscribe(auth);
