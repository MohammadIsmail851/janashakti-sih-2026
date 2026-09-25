import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const isAuth = localStorage.getItem('janashakti_is_auth');
    if (isAuth === 'false') {
      return null;
    }
    const saved = localStorage.getItem('janashakti_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default to student Aarav Hembram for demo evaluation
    return {
      role: 'student',
      id: 'ST-2025-OD-8921',
      name: 'Aarav Hembram',
      email: 'aarav.hembram@nitrkl.ac.in',
      institute: 'NIT Rourkela',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isAuth = localStorage.getItem('janashakti_is_auth');
    return isAuth !== 'false';
  });

  useEffect(() => {
    if (currentUser && isAuthenticated) {
      localStorage.setItem('janashakti_auth_user', JSON.stringify(currentUser));
      localStorage.setItem('janashakti_is_auth', 'true');
    } else {
      localStorage.removeItem('janashakti_auth_user');
      localStorage.setItem('janashakti_is_auth', 'false');
    }
  }, [currentUser, isAuthenticated]);

  const loginAsStudent = () => {
    const studentUser = {
      role: 'student',
      id: 'ST-2025-OD-8921',
      name: 'Aarav Hembram',
      email: 'aarav.hembram@nitrkl.ac.in',
      institute: 'NIT Rourkela',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    };
    setCurrentUser(studentUser);
    setIsAuthenticated(true);
    localStorage.setItem('janashakti_auth_user', JSON.stringify(studentUser));
    localStorage.setItem('janashakti_is_auth', 'true');
  };

  const loginAsAdmin = () => {
    const adminUser = {
      role: 'admin',
      id: 'MOTA-OFFICER-449',
      name: 'Dr. Rameshwar Oraon',
      designation: 'Director (Scholarships & DBT PMU)',
      department: 'Ministry of Tribal Affairs, New Delhi',
      email: 'rameshwar.oraon@mota.gov.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    };
    setCurrentUser(adminUser);
    setIsAuthenticated(true);
    localStorage.setItem('janashakti_auth_user', JSON.stringify(adminUser));
    localStorage.setItem('janashakti_is_auth', 'true');
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('janashakti_auth_user');
    localStorage.setItem('janashakti_is_auth', 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loginAsStudent,
        loginAsAdmin,
        logout,
        isAdmin: currentUser?.role === 'admin',
        isStudent: currentUser?.role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
