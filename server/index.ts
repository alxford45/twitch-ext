import { AxiosRequestConfig } from "axios";
import express, { Request, Response, NextFunction } from "express";
import { concatMap, map, tap, finalize } from "rxjs/operators";
import { Runelite } from "types/api";
import { PORT, SOCKETURL } from "./constants";
import { fetchData } from "./fetchData";
import { createWebSocket } from "./modules/createWebSocket";
import { fetchConfig } from "./modules/fetchConfig";
import { meta } from "./modules/meta";

const app = express();
const port = PORT;
const socketUrl = SOCKETURL;

app.locals.authenticated = false;
app.get("/api/auth", (req, res) => {
  const session$ = meta.pipe(
    tap(x => res.send(x.oauthUrl)),
    map(args => args.uid),
    concatMap(uid => {
      app.locals.uid = uid;
      const socket$ = createWebSocket(socketUrl, uid);
      return socket$;
    })
  );
  session$.subscribe({
    next: val => {
      console.log(val);
    },
    error: err => {
      console.log(err);
    },
    complete: () => {
      console.log("authenticated");
      app.locals.authenticated = true;
    }
  });
});

app.get("/api/loot", (_, res) => {
  const params: Runelite.Req.LootTracker = {};
  const endpoint = "loottracker";
  const loot$ = meta.pipe(
    concatMap((args: any) => {
      const { uid, version } = args;
      const config = fetchConfig(params, uid, version, endpoint);
      return fetchData<Runelite.Res.LootTracker>(config)!;
    })
  );
  loot$.subscribe({
    next: val => {
      console.log(val);
      res.send(val);
    },
    error: error => console.log(error),
    complete: () => console.log("done!")
  });
});
app.listen(port, () => {
  console.log(`now listening on port ${port}`);
  const request = meta.pipe(
    concatMap(args => {
      const { uid, version } = args;
      const options: AxiosRequestConfig = {
        headers: {
          "RUNELITE-AUTH": uid
        },
        method: "GET",
        url: `http://api.runelite.net/${version}/loottracker`
      };
      const response = fetchData<any>(options)!;
      return response;
    })
  );
});
