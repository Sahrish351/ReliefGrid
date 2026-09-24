import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

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

// Role Portals
import { CommandCenter } from './pages/coordinator/CommandCenter';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ResponderPortal } from './pages/responder/ResponderPortal';
import { HospitalPortal } from './pages/hospital/HospitalPortal';
import { ShelterPortal } from './pages/shelter/ShelterPortal';
import { OrganizationPortal } from './pages/organization/OrganizationPortal';
import { VolunteerPortal } from './pages/volunteer/VolunteerPortal';
import { AdminPortal } from './pages/admin/AdminPortal';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen flex flex-col bg-background text-charcoal-900 font-sans">
            <DemoBanner />
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Website (All 20 Pages) */}
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

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Operational Dashboards */}
                <Route path="/command" element={<CommandCenter />} />
                <Route path="/app" element={<CitizenDashboard />} />
                <Route path="/responder" element={<ResponderPortal />} />
                <Route path="/hospital" element={<HospitalPortal />} />
                <Route path="/shelter" element={<ShelterPortal />} />
                <Route path="/organization" element={<OrganizationPortal />} />
                <Route path="/volunteer/dashboard" element={<VolunteerPortal />} />
                <Route path="/admin" element={<AdminPortal />} />

                {/* Aliases & Fallbacks */}
                <Route path="/request-help" element={<Navigate to="/report-emergency" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
