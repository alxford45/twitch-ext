import { createContextToken, reader } from "@marblejs/core";
import { v4 } from "uuid/interfaces";
import uuid from "uuid/v4";
import Option from "fp-ts";

export const generateUuidToken = createContextToken<v4>();
export const generateUiid = reader.map(() => uuid);

export const authToken = createContextToken<string>();
export const auth = reader.map(ask =>
  ask(generateUuidToken).fold("none", a => a())
);
