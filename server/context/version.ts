import { createContextToken, reader } from "@marblejs/core";
import { AsyncSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { runeliteAuthOptions } from "../modules/constants";
import { fetchData } from "../modules/fetchData";
import { Github } from "types/api";

const source$ = fetchData<Github.Response>(runeliteAuthOptions)!.pipe(
  map(releases => releases[0]),
  map(latestRelease => latestRelease.name),
  map(name => name.split("-")),
  map(substrings => substrings.filter(str => str !== "parent")),
  map(substrings => substrings.join("-"))
);
//const version$ = new AsyncSubject<string>();
//source$.subscribe(version$);

export const versionToken = createContextToken<Observable<string>>();
export const version = reader.map(() => source$);
