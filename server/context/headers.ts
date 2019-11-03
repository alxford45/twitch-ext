import { createContextToken, reader } from "@marblejs/core";
import { Observable } from "rxjs";
import { concatMap, tap, map, mergeMap } from "rxjs/operators";
import { fetchData } from "../modules/fetchData";
import { Runelite } from "types/api";
import { authToken } from "./uuid";
import { versionToken } from "./version";

export const headerToken = createContextToken<Observable<string>>();
export const header = reader.map(ask => {
  const uuid = ask(authToken).toNullable();
  return ask(versionToken)
    .toNullable()!
    .pipe(
      concatMap(v => {
        const options: Runelite.Req.Config = {
          headers: {
            "RUNELITE-AUTH": uuid!
          },
          method: "GET",
          baseURL: "https://api.runelite.net/",
          url: `${v}/account/login?uuid=${uuid!}`
        };

        const response = fetchData<Runelite.Res.Auth>(options);
        return response;
      }),
      map(response => response.oauthUrl)
    );
});
