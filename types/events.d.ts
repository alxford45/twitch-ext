import { AxiosRequestConfig } from "axios";

/**
 * Union type of ws [[WebSocket]] Events
 *
 * [[MessageEvent]], [[OpenEvent]], [[CloseEvent]], [[ErrorEvent]]
 */
export declare type MessageEvent = {
  type: string;
  username: string;
  _party: boolean;
};
export declare type ErrorEvent = any;
export declare type CloseEvent = number;
export declare type WebSocketEvent = MessageEvent | CloseEvent | ErrorEvent;
