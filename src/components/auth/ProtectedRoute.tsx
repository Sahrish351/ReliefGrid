import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldAlert, Lock, Radio } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950 text-white p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-emergency-600/20 border border-emergency-500/30 flex items-center justify-center mx-auto text-emergency-500">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight">Authenticating Session</h3>
            <p className="text-xs text-navy-300 mt-1">Verifying cryptographic credentials with Supabase...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If user role doesn't have permission for this portal, redirect to their role's home portal
    const roleRedirects: Record<UserRole, string> = {
      emergency_coordinator: '/portal/coordinator',
      citizen: '/portal/citizen',
      responder: '/portal/responder',
      hospital_staff: '/portal/hospital',
      shelter_manager: '/portal/shelter',
      organization_admin: '/portal/organization',
      volunteer: '/portal/volunteer',
      super_admin: '/portal/admin',
    };

    return <Navigate to={roleRedirects[user.role] || '/portal/citizen'} replace />;
  }

  return <>{children}</>;
};

