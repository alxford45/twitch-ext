import { Observable, Observer } from "rxjs";
import WebSocket from "ws";
import { WebSocketEvent, MessageEvent } from "types/events";
/**
 * Creates a ws [[WebSocket]] from a given webscocket url and uuid and returns the websocket
 * as an [[Observable]] of type [[WebSocketEvent]].
 *
 * TODO: Fix error handeling to prevent observer.complete() being called on webscocket time out
 * close event.
 *
 * @param socketURL Websocket server url for created websocket to connect to.
 * @param uid Unique uuid recieved from original authentication header.
 */
export const createWebSocket = (socketURL: string, uid: string) => {
  /**
   * ws websocket constructor
   */
  const ws: WebSocket = new WebSocket(socketURL);
  /**
   * observable constructor
   */
  const obs$: Observable<WebSocketEvent> = Observable.create(
    (observer: Observer<any>) => {
      /**
       * Couples ws event listener for event "open" with observer.next(ws) giving the observer access
       * to the initial websocket state. TODO: implement logging without passing entire websocket.
       */
      ws.on("open", () => {
        ws.send(
          JSON.stringify({
            type: "Handshake",
            _party: false,
            session: uid
          })
        );
        observer.next(ws.readyState);
      });
      /**
       * Couples ws event listener for event "message" with observer.next(event) for each recieved
       * message by the websocket. If the websocket recieves an event of type "LoginResponse",
       * authentication is successful and the websocket is closed. Finally observer.next(event) gives
       * access to the event to the observer.
       */
      ws.on("message", (payload: string) => {
        const event: MessageEvent = JSON.parse(payload);
        event.type === "LoginResponse"
          ? ws.close(1000, "user successfully authenticated")
          : null;
        observer.next(event);
      });
      /**
       * Couples ws event listener for event "close" with observer.complete() on sucessful closing code
       * or observer.error(event) on any other closing code.
       */
      ws.on("close", (code: number) => {
        code === 1000 ? observer.complete() : null;
      });
      /**
       * Couples ws event listener for event "error" with observer.error(event). Error handeling is then left
       * up to the observer on the future subscription.
       */
      ws.on("error", (payload: string) => {
        const event: ErrorEvent = JSON.parse(payload);
        observer.error(event);
      });
    }
  );
  return obs$;
};
