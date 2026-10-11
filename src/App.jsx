import React from 'react';
import { SkinCareProvider, useSkinCare } from './context/SkinCareContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { QuestionnaireScreen } from './components/screens/QuestionnaireScreen';
import { PhotoUploadScreen } from './components/screens/PhotoUploadScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { RoutinesScreen } from './components/screens/RoutinesScreen';
import { ProductsScreen } from './components/screens/ProductsScreen';
import { TrackerScreen } from './components/screens/TrackerScreen';
import { ProgressNotesScreen } from './components/screens/ProgressNotesScreen';
import { PrivacyScreen } from './components/screens/PrivacyScreen';

import './App.css';

const MainContent = () => {
  const { currentScreen } = useSkinCare();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'questionnaire':
        return <QuestionnaireScreen />;
      case 'photo':
        return <PhotoUploadScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'routines':
        return <RoutinesScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'tracker':
        return <TrackerScreen />;
      case 'journal':
        return <ProgressNotesScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main id="main-content" className="main-content-wrapper" tabIndex={-1}>
        {renderScreen()}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <SkinCareProvider>
      <MainContent />
    </SkinCareProvider>
  );
}
