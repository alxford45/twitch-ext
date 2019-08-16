import { AxiosRequestConfig } from "axios";
import { MessageEvent, OpenEvent, CloseEvent, ErrorEvent } from "ws";
/**
 * prototype for new type declaration file to replace types.d.ts
 *
 * TODO: Finish typings; Test for name collisions; Add docs; Refactor code
 */
declare namespace Runelite {
  interface LootRecord {
    eventId: string;
    type: string;
    drops: GameItem[];
    time: number;
  }
  interface GameItem {
    id: number;
    qty: number;
  }
  /**https://static.runelite.net/api/http-service/#/definitions/Item */
  interface Item {
    id: number;
    name: string;
    description: string;
    type: string;
  }
  interface ItemPrice {
    id: number;
    name: string;
    price: number;
    time: number;
  }
  type Icon = any[];
}
declare namespace Runelite.Request {
  const runeliteAuth = "RUNELITE-AUTH";
  interface Options {
    headers: {
      [runeliteAuth]: string;
    };
    method: string;
    url: string;
    baseurl: string;
    params?: Params;
  }
  interface Item {
    itemId: string;
  }
  interface ItemPrice {
    itemId: string;
    time?: string;
  }
  interface ItemPrices {
    //none
  }
  type ItemIcon = Item;
  type ItemIconLarge = Item;
  type Params = Item | ItemIcon | ItemIconLarge | ItemPrice | ItemPrices;
  type Config = Options & AxiosRequestConfig;
}
declare namespace Runelite.Response {
  interface Authentication {
    uid: string;
    oauthUrl: string;
  }

  type Item = Runelite.Item;
  type ItemIcon = Runelite.Icon;
  type ItemIconLarge = Runelite.Icon;
  type ItemPrice = Runelite.ItemPrice;
  type ItemPrices = Runelite.ItemPrice[];
  type LootTracker = Runelite.LootRecord[];
}
declare namespace Github {
  const userAgent = "User-Agent";
  interface Options {
    headers: {
      [userAgent]: string;
    };
    method: string;
    url: string;
  }
  type Request = Options & AxiosRequestConfig;
  type Response = { name: string }[];
}
declare type WebSocketEvent =
  | MessageEvent
  | OpenEvent
  | CloseEvent
  | ErrorEvent;
