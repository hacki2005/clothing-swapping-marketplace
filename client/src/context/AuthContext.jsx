import { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email) => {
    // mock login: just find a user by matching contact email, or fall back to first user
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

export function useAuth() {
  return useContext(AuthContext);
}