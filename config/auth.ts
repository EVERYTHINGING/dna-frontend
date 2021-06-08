// src/lib/auth.ts

import { initReactQueryAuth } from "react-query-auth";
import { IAccount } from "@spree/storefront-api-v2-sdk/types/interfaces/Account";
import { spreeClient } from "./spree";
import { storage } from "./storage";

interface LoginUser {
  username: string;
  password: string;
}

interface SpreeUser {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
}

const authConfig = {
  loadUser: async () => {
    const token = storage.getToken();
    console.warn("TOKEN: ", token);
    if (token?.access_token && token?.token_type === "Bearer") {
      const response = await spreeClient.account.accountInfo({ bearerToken: token.access_token });
      if (response.isSuccess()) {
        console.warn("USER LOADED: ", response.success());
        return response.success();
      }
      console.warn(response.fail());
      return null;
    }
  },
  loginFn: async (data: unknown) => {
    console.warn("LOGIN DATA: ", data);
    const response = await spreeClient.authentication.getToken(data as LoginUser);
    if (response.isSuccess()) {
      const result = response.success();
      storage.setToken(result);
      const user = await authConfig.loadUser();
      return user;
    } else {
      Promise.reject(response.fail());
    }
  },
  registerFn: async (data: unknown) => {
    const response = await spreeClient.account.create(data as SpreeUser);
    if (response.isSuccess()) {
      console.warn("REGISTER SUCCESS: ", response.success());
      // register does not receive a token
      // so we can decide to either run the login automatically or ask the user to login
      // also this is where there should be some notification about confirming their email

      return response.success();
    } else {
      console.warn("FAILED REGISTER: ", response.fail());
      Promise.reject(response.fail());
    }
  },
  logoutFn: async () => {
    storage.clearToken();
  }
};

export const { AuthProvider, useAuth } = initReactQueryAuth<IAccount | null, string>(authConfig);
