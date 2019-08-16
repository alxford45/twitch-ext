import { map } from "rxjs/operators";

import { runeliteAuthOptions } from "../data/constants";
import { fetchData } from "../fetchData";
import { GithubResponse } from "../types";

/**
 * [[Observable]]<string> created from [[fetchData]] that is transformed into emitting
 * the most recent version of Runelite as a string from the most recent Runelite Release on
 * Github. This formatted version string is required for all future Runelite HTTP API requests.
 */
export const version$ = fetchData<GithubResponse>(runeliteAuthOptions)!.pipe(
  map(releases => releases[0]),
  map(latestRelease => latestRelease.name),
  map(name => name.split("-")),
  map(substrings => substrings.filter(str => str !== "parent")),
  map(substrings => substrings.join("-"))
);
//export const version = new ReplaySubject<string>(1);
//source$.subscribe(version);
