import { AxiosRequestConfig } from "axios";

export const runeliteAuthOptions: AxiosRequestConfig = {
  url: "https://api.github.com/repos/runelite/runelite/tags",
  method: "GET",
  headers: {
    "User-Agent": "alxford45"
  }
};
export const PORT: number = 3000;
export const SOCKETURL: string = "wss://api.runelite.net/ws";
