import { Runelite } from "types/api";

export const fetchConfig = (
  params: Runelite.Req.Params,
  uid: string,
  version: string,
  endpoint: string
): Runelite.Req.Config => {
  const config: Runelite.Req.Options = {
    baseURL: "https://api.runelite.net/",
    headers: {
      "RUNELITE-AUTH": uid
    },
    method: "GET",
    url: `${version}/${endpoint}`,
    params: {
      params
    }
  };
  return config;
};
