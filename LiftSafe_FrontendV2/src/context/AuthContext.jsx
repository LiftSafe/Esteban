import { createContext, useContext, useState } from 'react';
import { DEMO_USERS } from '../constants/demoUsers';
import { canDo } from '../config/roles';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('liftsafe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (!found) return false;
    const userWithoutPassword = { ...found };
    delete userWithoutPassword.password;
    localStorage.setItem('liftsafe_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return true;
  };

  const register = (formData) => {
    const exists = DEMO_USERS.some(u => u.email === formData.email);
    if (exists) return { success: false, message: 'El correo ya está registrado' };
    const newUser = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
      role: formData.role,
    };
    localStorage.setItem('liftsafe_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('liftsafe_user');
    setUser(null);
  };

  const hasAction = (action) => canDo(user?.role, action);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, hasAction }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);