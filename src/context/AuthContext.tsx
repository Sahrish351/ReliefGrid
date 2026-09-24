import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (newRole: UserRole) => void;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (fullName: string, email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  citizen: {
    id: 'user-citizen-1',
    full_name: 'Tariq Mehmood',
    email: 'tariq.mehmood@reliefgrid.org',
    phone_optional: '+92 300 5551042',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'citizen',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  responder: {
    id: 'user-resp-1',
    full_name: 'Capt. Arshad Malik',
    email: 'arshad.malik@rescue1122.gov.pk',
    phone_optional: '+92 321 8889900',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'responder',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  hospital_staff: {
    id: 'user-hosp-1',
    full_name: 'Dr. Shahida Parveen',
    email: 'dr.shahida@mayohospital.edu.pk',
    phone_optional: '+92 333 4441122',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    role: 'hospital_staff',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  shelter_manager: {
    id: 'user-shelter-1',
    full_name: 'Rashid Minhas',
    email: 'rashid.minhas@expocenter.gov.pk',
    phone_optional: '+92 345 6667788',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    role: 'shelter_manager',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  organization_admin: {
    id: 'user-ngo-1',
    full_name: 'Zahra Mansoor',
    email: 'zahra.m@edhifoundation.org',
    phone_optional: '+92 301 7773344',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'organization_admin',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  volunteer: {
    id: 'user-vol-1',
    full_name: 'Dr. Ayesha Siddiqui',
    email: 'ayesha.s@example.org',
    phone_optional: '+92 300 1112233',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'volunteer',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  emergency_coordinator: {
    id: 'user-coord-1',
    full_name: 'Brig. (R) Imran Hashmi',
    email: 'imran.hashmi@ndma.gov.pk',
    phone_optional: '+92 300 9998877',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    role: 'emergency_coordinator',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  super_admin: {
    id: 'user-admin-1',
    full_name: 'Sahrish Administrator',
    email: 'admin@reliefgrid.ai',
    phone_optional: '+92 300 0000000',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'super_admin',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('emergency_coordinator');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('reliefgrid_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USERS['emergency_coordinator'];
      }
    }
    return DEFAULT_USERS['emergency_coordinator'];
  });

  useEffect(() => {
    if (user) {
      setRole(user.role);
      localStorage.setItem('reliefgrid_user', JSON.stringify(user));
    }
  }, [user]);

  const switchRole = (newRole: UserRole) => {
    const newUser = DEFAULT_USERS[newRole] || DEFAULT_USERS['citizen'];
    setUser(newUser);
    setRole(newRole);
    localStorage.setItem('reliefgrid_user', JSON.stringify(newUser));
  };

  const login = async (email: string, targetRole: UserRole = 'citizen') => {
    const matchingRoleUser = Object.values(DEFAULT_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    const selectedUser = matchingRoleUser || {
      ...DEFAULT_USERS[targetRole],
      email,
      full_name: email.split('@')[0],
      role: targetRole,
    };
    setUser(selectedUser);
    setRole(selectedUser.role);
    localStorage.setItem('reliefgrid_user', JSON.stringify(selectedUser));
  };

  const register = async (fullName: string, email: string, selectedRole: UserRole) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      full_name: fullName,
      email,
      role: selectedRole,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(newUser);
    setRole(selectedRole);
    localStorage.setItem('reliefgrid_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reliefgrid_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        switchRole,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
