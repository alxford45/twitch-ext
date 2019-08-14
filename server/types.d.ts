import { Observable } from "rxjs";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import {
  NodeEventHandler,
  NodeStyleEventEmitter
} from "rxjs/internal/observable/fromEvent";
import WebSocket, { MessageEvent, OpenEvent, CloseEvent, ErrorEvent } from "ws";
import { EventEmitter } from "events";

export declare type FetchData = <T>(
  options: AxiosRequestConfig
) => Observable<T> | undefined;
export declare type GithubResponse = [{ name: string }];
export declare type RuneliteResponse = { uid: string; oauthUrl: string };
export declare type WebSocketEvent =
  | MessageEvent
  | OpenEvent
  | CloseEvent
  | ErrorEvent;
export declare type Emitter = WebSocket & NodeStyleEventEmitter;
