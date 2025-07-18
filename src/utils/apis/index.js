import { environment } from "../constants/apiUrls";

export const BASE_URL = environment.live;

export const API_URL = {
  addUser: `${BASE_URL}/users`,
  send: `${BASE_URL}/send`,
};

export const headerJson = { "Content-Type": "application/json" };
