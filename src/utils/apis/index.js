import { environment } from "../constants/apiUrls";

export const BASE_URL = environment.local;

export const API_URL = {
  addUser: `${BASE_URL}/users`,
};

export const headerJson = { "Content-Type": "application/json" };
