import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { IAuth, IUser } from "interfaces/user.interface";

type AppContextType = {
  auth: IAuth;
  changeAuth(authInfo: IAuth): void;
};

const AppContext = createContext<AppContextType>(
  undefined as unknown as AppContextType
);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<IAuth>({
    isAuthenticated: false,
    userInfo: {} as IUser,
  });

  const changeAuth = (authInfo: IAuth) => {
    setAuth(authInfo);
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        changeAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useStore() {
  return useContext(AppContext);
}
