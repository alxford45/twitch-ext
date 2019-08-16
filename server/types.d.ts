import WebSocket, { MessageEvent, OpenEvent, CloseEvent, ErrorEvent } from "ws";
/**
 * The implicit schema of the Github response emitting any property unused for releases by
 * tap name.
 *
 * endpoint: GET /repos/:owner/:repo/releases/tags/:tag
 *
 * source: https://developer.github.com/v3/repos/releases/#get-a-release-by-tag-name
 *
 */
export declare type GithubResponse = [{ name: string }];
/**
 * The explicit schema of the Runelite response for loggin in.
 *
 * endpoint: GET /api.runelite.net/runelite-:version/account/login
 *
 * source: https://static.runelite.net/api/http-service/#accountlogin
 */
export declare type RuneliteAuthResponse = { uid: string; oauthUrl: string };
/**
 * The explicit schema of Runelite response for LootTracker.
 *
 * endpoint: GET /api.runelite.net/runelite-:version/loottracker
 *
 * source: https://static.runelite.net/api/http-service/#loottracker
 */
export declare type RuneliteLootTrackerResponse = LootRecord[];
/**
 * The excplicit schema of Runelite LootRecord Object
 *
 * source: https://static.runelite.net/api/http-service/#/definitions/LootRecord
 */
export declare type LootRecord = {
  eventId: string;
  type: string;
  drops: GameItem[];
  time: number;
};
/**
 * The explicit schema of Runelite GameItem Object
 *
 * source: https://static.runelite.net/api/http-service/#/definitions/GameItem
 */
export declare type GameItem = {
  id: number;
  qty: number;
};
/**
 * Union type of ws [[WebSocket]] Events
 *
 * [[MessageEvent]], [[OpenEvent]], [[CloseEvent]], [[ErrorEvent]]
 */
export declare type WebSocketEvent =
  | MessageEvent
  | OpenEvent
  | CloseEvent
  | ErrorEvent;
