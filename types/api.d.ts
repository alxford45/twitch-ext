import { AxiosRequestConfig } from "axios";
/**
 * prototype for new type declaration file to replace types.d.ts
 *
 * TODO: Finish typings; Test for name collisions; Add docs; Refactor code
 */

export declare namespace Runelite {
  /**
   * The excplicit schema of Runelite LootRecord Object
   *
   * source: https://static.runelite.net/api/http-service/#/definitions/LootRecord
   */
  interface LootRecord {
    eventId: string;
    type: string;
    drops: GameItem[];
    time: number;
  }
  /**
   * The explicit schema of Runelite GameItem Object
   *
   * source: https://static.runelite.net/api/http-service/#/definitions/GameItem
   */
  interface GameItem {
    id: number;
    qty: number;
  }
  /**
   * The exclicit schema of Runelite Item Object
   *
   * source: https://static.runelite.net/api/http-service/#/definitions/Item */
  interface Item {
    id: number;
    name: string;
    description: string;
    type: string;
  }
  /**
   * The explicit schema of Runelite Item Price Object
   *
   * source: https://static.runelite.net/api/http-service/#/definitions/ItemPrice
   */
  interface ItemPrice {
    id: number;
    name: string;
    price: number;
    time: number;
  }
  /**
   * The implicit schema of Runelite Icons
   *
   * explicitly described as Array[]
   */
  type Icon = any[];
}
export declare namespace Runelite.Req {
  const runeliteAuth = "RUNELITE-AUTH";

  /**
   * The implicit Runelite Request schema
   */
  interface Options extends AxiosRequestConfig {
    /**
     * runeliteAuth expects a uuid value
     */
    headers: {
      [runeliteAuth]: string;
    };
    /**
     * implemented for GET requests only
     */
    method: "GET";
    /**
     * expects most recent version of runelite and endpoint e.g. "runelite-1.5.31.1/endpoint"
     */
    url: string;
    baseURL: "https://api.runelite.net/";
    /**
     * endpoint parameters should be specified under params insstead of in url property
     */
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

  interface LootTracker {
    count?: number;
    start?: number;
  }
  type ItemIcon = Item;
  type ItemIconLarge = Item;
  type Params =
    | Item
    | ItemIcon
    | ItemIconLarge
    | ItemPrice
    | ItemPrices
    | LootTracker;
  type Config = Options & AxiosRequestConfig;
}
export declare namespace Runelite.Res {
  /**
   * The explicit schema of the Runelite response for loggin in.
   *
   * source: https://static.runelite.net/api/http-service/#accountlogin
   */
  interface Auth {
    uid: string;
    oauthUrl: string;
  }

  type Item = Runelite.Item;
  type ItemIcon = Runelite.Icon;
  type ItemIconLarge = Runelite.Icon;
  type ItemPrice = Runelite.ItemPrice;
  type ItemPrices = Runelite.ItemPrice[];
  /**
   * The explicit schema of Runelite response for LootTracker.
   *
   * endpoint: GET /api.runelite.net/runelite-:version/loottracker
   *
   * source: https://static.runelite.net/api/http-service/#loottracker
   */
  type LootTracker = Runelite.LootRecord[];
}
export declare namespace Github {
  const userAgent = "User-Agent";
  interface Options {
    headers: {
      [userAgent]: string;
    };
    method: string;
    url: string;
  }
  type Request = Options & AxiosRequestConfig;
  /**
   * The implicit schema of the Github response emitting any property unused for releases by
   * tap name.
   *
   * endpoint: GET /repos/:owner/:repo/releases/tags/:tag
   *
   * source: https://developer.github.com/v3/repos/releases/#get-a-release-by-tag-name
   *
   */
  type Response = { name: string }[];
}
