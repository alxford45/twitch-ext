import express from "express";
import { concatMap, map, tap } from "rxjs/operators";
import { meta } from "./modules/meta";
import { createWebSocket } from "./modules/createWebSocket";
import { fetchData } from "./fetchData";
import { AxiosRequestConfig } from "axios";
const app = express();
const PORT = 3000;
const socketUrl = "wss://api.runelite.net/ws";

app.get("/api/auth", (_, res) => {
  res.send("testing");
});
app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
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
  const session$ = meta.pipe(
    tap(x => {
      console.log(x.oauthUrl);
    }),
    map(args => args.uid),
    concatMap(uid => {
      const socket$ = createWebSocket(socketUrl, uid);
      return socket$;
    })
  );
  session$.subscribe({
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => {
      console.log("done");
      request.subscribe(x => {
        const data = x.map((y: any) => {
          return {
            target: `${y.type} ${y.eventId}`,
            drops: y.drops.flatMap((z: any) => `id: ${z.id}, qty: ${z.qty}`),
            time: y.time.seconds
          };
        });
        console.log(data);
      });
    }
  });
});
