import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Context Providers
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ScholarshipProvider } from './context/ScholarshipContext';
import { ChatProvider } from './context/ChatContext';

// Common Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { DocumentPreviewModal } from './components/common/DocumentPreviewModal';
import { UploadScannerModal } from './components/common/UploadScannerModal';

// Pages
import { SplashScreen } from './pages/SplashScreen';
import { LoginScreen } from './pages/LoginScreen';
import { HomeScreen } from './pages/HomeScreen';
import { ScholarshipsScreen } from './pages/ScholarshipsScreen';
import { ScholarshipDetailScreen } from './pages/ScholarshipDetailScreen';
import { WalletScreen } from './pages/WalletScreen';
import { VerificationCenterScreen } from './pages/VerificationCenterScreen';
import { DbtTimelineScreen } from './pages/DbtTimelineScreen';
import { ChatbotScreen } from './pages/ChatbotScreen';
import { NotificationsScreen } from './pages/NotificationsScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { AdminPortalScreen } from './pages/AdminPortalScreen';

const MainLayout = () => {
  const location = useLocation();
  const isAuthScreen = location.pathname === '/splash' || location.pathname === '/login';

  if (isAuthScreen) {
    return (
      <main className="min-h-screen bg-slate-900">
        <Routes>
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toast />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-surface-bg flex text-slate-900 font-sans antialiased">
      {/* Responsive Sidebar for Desktop (lg+) */}
      <Sidebar />

      {/* Main Responsive Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/scholarships" element={<ScholarshipsScreen />} />
            <Route path="/scholarships/:schemeId" element={<ScholarshipDetailScreen />} />
            <Route path="/wallet" element={<WalletScreen />} />
            <Route path="/verification" element={<VerificationCenterScreen />} />
            <Route path="/dbt" element={<DbtTimelineScreen />} />
            <Route path="/chatbot" element={<ChatbotScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/admin" element={<AdminPortalScreen />} />
            
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>

        {/* Bottom Nav for Mobile / Tablet (< lg) */}
        <BottomNav />
      </div>

      {/* Global Interactive Modals */}
      <Toast />
      <DocumentPreviewModal />
      <UploadScannerModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <ScholarshipProvider>
          <AuthProvider>
            <ChatProvider>
              <BrowserRouter>
                <MainLayout />
              </BrowserRouter>
            </ChatProvider>
          </AuthProvider>
        </ScholarshipProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}
