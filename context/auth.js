import React, { createContext, useState } from "react";

export const AuthUserContext = createContext({});
const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <AuthUserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
