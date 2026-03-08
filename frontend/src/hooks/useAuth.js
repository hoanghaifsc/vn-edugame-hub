/**
 * useAuth.js — PROTOTYPE MODE (no Firebase)
 * Cho phép switch role bằng UI để demo tất cả luồng.
 */
import { useState, createContext, useContext } from 'react';
import { MOCK_USERS } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(MOCK_USERS.student);

  const switchRole = (role) => setUserProfile(MOCK_USERS[role] || MOCK_USERS.student);

  return (
    <AuthContext.Provider value={{ user: userProfile, userProfile, loading: false, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
