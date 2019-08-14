import { AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import uuid from "uuid/v4";

import { fetchData } from "../fetchData";
import { RuneliteResponse } from "../types";
import { version$ } from "./version";

export const auth$: Observable<RuneliteResponse> = version$.pipe(
  concatMap((v: string) => {
    const localUuid = uuid();
    const options: AxiosRequestConfig = {
      headers: {
        "RUNELITE-AUTH": localUuid
      },
      method: "GET",
      url: `http://api.runelite.net/${v}/account/login?uuid=${localUuid}`
    };

    const response = fetchData<RuneliteResponse>(options)!;
    return response;
  })
);
//export const auth = new ReplaySubject<RuneliteResponse>(0);
//source$.subscribe(auth);
