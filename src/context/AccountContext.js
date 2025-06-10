// src/context/AccountContext.js
import { createContext, useState } from 'react';

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [accountData, setAccountData] = useState(null);
  return (
    <AccountContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
}
