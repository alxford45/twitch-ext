import { AxiosRequestConfig } from "axios";

export const runeliteAuthOptions: AxiosRequestConfig = {
  url: "https://api.github.com/repos/runelite/runelite/tags",
  method: "GET",
  headers: {
    "User-Agent": "alxford45"
  }
};
export const PORT = 3000;
export const SOCKETURL = "wss://api.runelite.net/ws";
