import { AxiosRequestConfig } from "axios";
import { map } from "rxjs/operators";

import { fetchData } from "../fetchData";
import { GithubResponse } from "../types";

const options: AxiosRequestConfig = {
  url: "https://api.github.com/repos/runelite/runelite/tags",
  method: "GET",
  headers: {
    "User-Agent": "alxford45"
  }
};
export const version$ = fetchData<GithubResponse>(options)!.pipe(
  map(releases => releases[0]),
  map(latestRelease => latestRelease.name),
  map(name => name.split("-")),
  map(substrings => substrings.filter(str => str !== "parent")),
  map(substrings => substrings.join("-"))
);
//export const version = new ReplaySubject<string>(1);
//source$.subscribe(version);
