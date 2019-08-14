import { Observable, Observer } from "rxjs";
import WebSocket, { MessageEvent, CloseEvent, ErrorEvent } from "ws";
import { WebSocketEvent } from "../types";

export const createWebSocket = (socketURL: string, uid: string) => {
  const ws: WebSocket = new WebSocket(socketURL);
  const obs$: Observable<WebSocketEvent> = Observable.create(
    (observer: Observer<WebSocketEvent>) => {
      ws.on("open", () => {
        ws.send(
          JSON.stringify({
            type: "Handshake",
            _party: false,
            session: uid
          })
        );
        observer.next({ target: ws });
      });
      ws.on("message", (payload: string) => {
        const event: MessageEvent = JSON.parse(payload);
        event.type === "LoginResponse" ? ws.close(1000) : null;
        observer.next(event);
      });
      ws.on("close", (payload: string) => {
        const event: CloseEvent = JSON.parse(payload);
        event.code === 1006 ? observer.error(event) : observer.complete();
      });
      ws.on("error", (payload: string) => {
        const event: ErrorEvent = JSON.parse(payload);
        observer.error(event);
      });
    }
  );
  return obs$;
};
