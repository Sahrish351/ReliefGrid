import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { HowItWorks } from './pages/public/HowItWorks';
import { LiveNetwork } from './pages/public/LiveNetwork';
import { EmergencyTypes } from './pages/public/EmergencyTypes';
import { SafetyCenter } from './pages/public/SafetyCenter';
import { FindShelter } from './pages/public/FindShelter';
import { FindHospital } from './pages/public/FindHospital';
import { ReportEmergency } from './pages/public/ReportEmergency';
import { TrackEmergency } from './pages/public/TrackEmergency';
import { MissingPerson } from './pages/public/MissingPerson';
import { Volunteer } from './pages/public/Volunteer';
import { Support } from './pages/public/Support';
import { Organizations } from './pages/public/Organizations';
import { Impact } from './pages/public/Impact';
import { AiTechnology } from './pages/public/AiTechnology';
import { Resources } from './pages/public/Resources';
import { FAQ } from './pages/public/FAQ';
import { Contact } from './pages/public/Contact';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';

// Role Portals
import { CommandCenter } from './pages/coordinator/CommandCenter';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ResponderPortal } from './pages/responder/ResponderPortal';
import { HospitalPortal } from './pages/hospital/HospitalPortal';
import { ShelterPortal } from './pages/shelter/ShelterPortal';
import { OrganizationPortal } from './pages/organization/OrganizationPortal';
import { VolunteerPortal } from './pages/volunteer/VolunteerPortal';
import { AdminPortal } from './pages/admin/AdminPortal';
import { IncidentDetail } from './pages/incident/IncidentDetail';

// Public Layout Wrapper with Navigation & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-charcoal-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Layout Routes (Marketing & Auth) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/emergency-map" element={<LiveNetwork />} />
              <Route path="/emergency-types" element={<EmergencyTypes />} />
              <Route path="/safety" element={<SafetyCenter />} />
              <Route path="/shelters" element={<FindShelter />} />
              <Route path="/hospitals" element={<FindHospital />} />
              <Route path="/report-emergency" element={<ReportEmergency />} />
              <Route path="/track-emergency" element={<TrackEmergency />} />
              <Route path="/missing-person" element={<MissingPerson />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/support" element={<Support />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/ai-technology" element={<AiTechnology />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Aliases */}
              <Route path="/request-help" element={<Navigate to="/report-emergency" replace />} />
            </Route>

            {/* Operational Dashboards (Strictly Protected by ProtectedRoute & DashboardLayout) */}
            
            {/* Coordinator Command Center */}
            <Route
              path="/portal/coordinator"
              element={
                <ProtectedRoute allowedRoles={['emergency_coordinator', 'super_admin']}>
                  <DashboardLayout
                    title="Emergency Command Center"
                    subtitle="Provincial Disaster Management Authority (PDMA) Punjab"
                  >
                    <CommandCenter />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/command" element={<Navigate to="/portal/coordinator" replace />} />

            {/* Citizen Portal */}
            <Route
              path="/portal/citizen"
              element={
                <ProtectedRoute allowedRoles={['citizen', 'super_admin']}>
                  <DashboardLayout
                    title="Citizen Response Portal"
                    subtitle="Personal Emergency Dispatch & Safety Telemetry"
                  >
                    <CitizenDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/app" element={<Navigate to="/portal/citizen" replace />} />

            {/* Rescue Responder Tactical Console */}
            <Route
              path="/portal/responder"
              element={
                <ProtectedRoute allowedRoles={['responder', 'super_admin']}>
                  <DashboardLayout
                    title="Rescue Responder Mission Queue"
                    subtitle="Rescue 1122 Rapid Tactical Response Unit"
                  >
                    <ResponderPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/responder" element={<Navigate to="/portal/responder" replace />} />

            {/* Hospital Trauma Staff Portal */}
            <Route
              path="/portal/hospital"
              element={
                <ProtectedRoute allowedRoles={['hospital_staff', 'super_admin']}>
                  <DashboardLayout
                    title="Hospital Trauma & Bed Management"
                    subtitle="Emergency Triage & Inbound Ambulance Telemetry"
                  >
                    <HospitalPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/hospital" element={<Navigate to="/portal/hospital" replace />} />

            {/* Shelter Manager Portal */}
            <Route
              path="/portal/shelter"
              element={
                <ProtectedRoute allowedRoles={['shelter_manager', 'super_admin']}>
                  <DashboardLayout
                    title="Shelter & Evacuation Center"
                    subtitle="Capacity, Food, Water & Family Reunification Hub"
                  >
                    <ShelterPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/shelter" element={<Navigate to="/portal/shelter" replace />} />

            {/* NGO / Relief Organization Portal */}
            <Route
              path="/portal/ngo"
              element={
                <ProtectedRoute allowedRoles={['organization_admin', 'super_admin']}>
                  <DashboardLayout
                    title="Relief Organization Operations"
                    subtitle="Humanitarian Supply Chain & Warehousing Logistics"
                  >
                    <OrganizationPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/organization" element={<Navigate to="/portal/ngo" replace />} />

            {/* Volunteer Portal */}
            <Route
              path="/portal/volunteer"
              element={
                <ProtectedRoute allowedRoles={['volunteer', 'super_admin']}>
                  <DashboardLayout
                    title="Community Volunteer Operations"
                    subtitle="Disaster Relief Task Allocation & Deployment"
                  >
                    <VolunteerPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/volunteer/dashboard" element={<Navigate to="/portal/volunteer" replace />} />

            {/* Super Admin Control Room */}
            <Route
              path="/portal/admin"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <DashboardLayout
                    title="Super Admin Governance Matrix"
                    subtitle="Global System Audit, Security & AI Orchestration Controls"
                  >
                    <AdminPortal />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<Navigate to="/portal/admin" replace />} />

            {/* Reusable Detailed Incident Inspector */}
            <Route
              path="/portal/incident/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout
                    title="Incident Geospatial & Telemetry Inspector"
                    subtitle="Real-time multi-agency situational analysis & AI explainability"
                  >
                    <IncidentDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Global Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
