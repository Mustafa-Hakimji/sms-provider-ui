import React, { useContext, useEffect, useState } from "react";
import {
  getStorageItem,
  setStorageItem,
} from "../utils/functions/commonFunctions";
import { USER_DATA } from "../utils/constants/localStorageKeys";

const Context: any = React.createContext(null);

const ContextProvider = ({ children }: any) => {
  const [name, setName] = useState("Mustafa");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userData, setUserData] = useState<null | {}>(null);

  useEffect(() => {});

  const updateProviderAndLocalStorage = (
    key: string,
    value: any,
    setterFunction: (value: any) => {}
  ) => {
    setStorageItem(key, value);
    setterFunction(value);
  };

  const getUserFromLocal = (key: string) => {
    const value = getStorageItem(key);
    setUserData(value);
  };

  useEffect(() => {
    getUserFromLocal(USER_DATA);
  }, []);

  const contextValue = {
    name,
    setName,
    isLoginForm,
    setIsLoginForm,
    userData,
    setUserData,
    updateProviderAndLocalStorage,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useContextHook = () => useContext(Context);

export default ContextProvider;
