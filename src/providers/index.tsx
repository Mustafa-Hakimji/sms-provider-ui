import React, { useContext, useEffect, useState } from "react";
import {
  getStorageItem,
  setStorageItem,
} from "../utils/functions/commonFunctions";
import { USER_DATA } from "../utils/constants/localStorageKeys";

const Context: any = React.createContext(null);

const ContextProvider = ({ children }: any) => {
  const [name, setName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userData, setUserData] = useState<null | {}>(null);
  const [number, setNumber] = useState("");

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
    number,
    setNumber,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useContextHook: any = () => useContext(Context);

export default ContextProvider;
