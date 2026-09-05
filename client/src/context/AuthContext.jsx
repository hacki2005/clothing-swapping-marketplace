import { createContext, useState } from "react";
import { mockUsers } from "../data/mockData";



export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email) => {
    const found = mockUsers.find((u) => u.contact === email) || mockUsers[0];
    setCurrentUser(found);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const AuthContext = createContext(null);