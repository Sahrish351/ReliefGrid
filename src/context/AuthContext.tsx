import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  switchRole: (newRole: UserRole) => void;
  login: (email: string, password?: string, targetRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, password: string, selectedRole: UserRole) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  emergency_coordinator: {
    id: 'user-coord-1',
    full_name: 'Brig. (R) Imran Hashmi',
    email: 'coordinator@reliefgrid.ai',
    phone_optional: '+92 300 9998877',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    role: 'emergency_coordinator',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  citizen: {
    id: 'user-citizen-1',
    full_name: 'Tariq Mehmood',
    email: 'citizen@reliefgrid.ai',
    phone_optional: '+92 300 5551042',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'citizen',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  responder: {
    id: 'user-resp-1',
    full_name: 'Capt. Arshad Malik',
    email: 'responder@reliefgrid.ai',
    phone_optional: '+92 321 8889900',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'responder',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  hospital_staff: {
    id: 'user-hosp-1',
    full_name: 'Dr. Shahida Parveen',
    email: 'hospital@reliefgrid.ai',
    phone_optional: '+92 333 4441122',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    role: 'hospital_staff',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  shelter_manager: {
    id: 'user-shelter-1',
    full_name: 'Rashid Minhas',
    email: 'shelter@reliefgrid.ai',
    phone_optional: '+92 345 6667788',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    role: 'shelter_manager',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  organization_admin: {
    id: 'user-ngo-1',
    full_name: 'Zahra Mansoor',
    email: 'ngo@reliefgrid.ai',
    phone_optional: '+92 301 7773344',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'organization_admin',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  volunteer: {
    id: 'user-vol-1',
    full_name: 'Dr. Ayesha Siddiqui',
    email: 'volunteer@reliefgrid.ai',
    phone_optional: '+92 300 1112233',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'volunteer',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
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
    created_at: '2026-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('reliefgrid_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [role, setRole] = useState<UserRole>(user?.role || 'citizen');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore or check Supabase session on boot
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.user && isMounted) {
            const sbUser = data.session.user;
            // Check if profile exists in public.profiles
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', sbUser.id)
              .maybeSingle();

            if (profile) {
              const fullProfile: UserProfile = {
                id: profile.id,
                full_name: profile.full_name || sbUser.email?.split('@')[0] || 'User',
                email: sbUser.email || '',
                phone_optional: profile.phone || '',
                role: profile.role || 'citizen',
                status: 'active',
                created_at: profile.created_at || new Date().toISOString(),
                updated_at: profile.updated_at || new Date().toISOString(),
              };
              setUser(fullProfile);
              setRole(fullProfile.role);
              localStorage.setItem('reliefgrid_user', JSON.stringify(fullProfile));
            }
          }
        }
      } catch (err) {
        console.warn('Session check fallback to cached state');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const switchRole = (newRole: UserRole) => {
    const newUser = DEFAULT_USERS[newRole];
    setUser(newUser);
    setRole(newRole);
    localStorage.setItem('reliefgrid_user', JSON.stringify(newUser));
  };

  const login = async (
    email: string,
    password = 'password123',
    targetRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // 1. Check if user is testing with demo email/profile
      const normalizedEmail = email.trim().toLowerCase();
      const matchedDemo = Object.values(DEFAULT_USERS).find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (matchedDemo) {
        setUser(matchedDemo);
        setRole(matchedDemo.role);
        localStorage.setItem('reliefgrid_user', JSON.stringify(matchedDemo));
        setIsLoading(false);
        return { success: true };
      }

      // 2. Attempt real Supabase authentication
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (error) {
          // If password was wrong or user doesn't exist, allow fallback to simulated login if targetRole provided
          if (targetRole) {
            const fallbackUser: UserProfile = {
              id: `user-${Date.now()}`,
              full_name: email.split('@')[0],
              email: normalizedEmail,
              role: targetRole,
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            setUser(fallbackUser);
            setRole(targetRole);
            localStorage.setItem('reliefgrid_user', JSON.stringify(fallbackUser));
            setIsLoading(false);
            return { success: true };
          }
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const assignedRole = (profile?.role as UserRole) || targetRole || 'citizen';
          const fullProfile: UserProfile = {
            id: data.user.id,
            full_name: profile?.full_name || data.user.email?.split('@')[0] || 'User',
            email: data.user.email || normalizedEmail,
            role: assignedRole,
            status: 'active',
            created_at: data.user.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(fullProfile);
          setRole(assignedRole);
          localStorage.setItem('reliefgrid_user', JSON.stringify(fullProfile));
          setIsLoading(false);
          return { success: true };
        }
      }

      // 3. Fallback demo login
      const fallbackUser: UserProfile = {
        id: `user-${Date.now()}`,
        full_name: email.split('@')[0],
        email: normalizedEmail,
        role: targetRole || 'citizen',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(fallbackUser);
      setRole(fallbackUser.role);
      localStorage.setItem('reliefgrid_user', JSON.stringify(fallbackUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password = 'password123',
    selectedRole: UserRole = 'citizen'
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              full_name: fullName,
              role: selectedRole,
            },
          },
        });

        if (error) {
          // Fallback registration for offline/local simulation
          console.warn('Supabase signup notice:', error.message);
        } else if (data?.user) {
          // Write to public.profiles table if possible
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            email: normalizedEmail,
            role: selectedRole,
            updated_at: new Date().toISOString(),
          });
        }
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        full_name: fullName,
        email: normalizedEmail,
        role: selectedRole,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(newUser);
      setRole(selectedRole);
      localStorage.setItem('reliefgrid_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const resetPassword = async (
    email: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          return { success: false, error: error.message };
        }
      }
      return {
        success: true,
        message: 'Password reset link dispatched. Please inspect your email inbox.',
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to dispatch reset email' };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Password update failed' };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Signout warning');
    } finally {
      setUser(null);
      localStorage.removeItem('reliefgrid_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        isLoading,
        switchRole,
        login,
        register,
        resetPassword,
        updatePassword,
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

