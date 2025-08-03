import { environment } from "../constants/environment";

export const BASE_URL = environment.local;

export const API_URL = {
  addUser: `${BASE_URL}/users`,
  send: `${BASE_URL}/send`,
  login: `${BASE_URL}/log/in`,
  users: `${BASE_URL}/users`,
  staffs: `${BASE_URL}/staffs`,
  messages: `${BASE_URL}/message`,
};

export const headerJson = { "Content-Type": "application/json" };
