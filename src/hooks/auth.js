import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@ChatUp:token');
    const user = localStorage.getItem('@ChatUp:user');

    if (user && token) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post('/session', {
      login,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@ChatUp:token', token);
    localStorage.setItem('@ChatUp:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ChatUp:token');
    localStorage.removeItem('@ChatUp:user');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };