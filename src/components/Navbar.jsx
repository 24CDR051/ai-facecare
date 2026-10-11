import React, { useState } from 'react';
import { useSkinCare } from '../context/SkinCareContext';
import { 
  Sparkles, 
  LayoutDashboard, 
  Sun, 
  ShoppingBag, 
  CheckCircle, 
  BookOpen, 
  ShieldCheck, 
  Camera, 
  Menu, 
  X,
  ClipboardList
} from 'lucide-react';

export const Navbar = () => {
  const { currentScreen, navigateTo, profile } = useSkinCare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'routines', label: 'Routines', icon: Sun },
    { id: 'tracker', label: 'Daily Tracker', icon: CheckCircle },
    { id: 'products', label: 'Products & Actives', icon: ShoppingBag },
    { id: 'journal', label: 'Skin Journal', icon: BookOpen },
    { id: 'photo', label: 'Photo Sandbox', icon: Camera },
    { id: 'questionnaire', label: 'Assessment', icon: ClipboardList },
    { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck }
  ];

  const handleNavClick = (screenId) => {
    navigateTo(screenId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand */}
        <button 
          type="button"
          className="brand-logo-btn" 
          onClick={() => handleNavClick(profile.hasCompletedOnboarding ? 'dashboard' : 'welcome')}
          aria-label="AI FaceCare Home"
        >
          <div className="brand-icon-wrapper">
            <Sparkles size={20} className="brand-sparkle-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">AI FaceCare</span>
            <span className="brand-subtitle">Mindful Skincare Companion</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Mini Avatar / Status */}
        <div className="navbar-actions">
          {profile.photo ? (
            <button
              type="button"
              className="navbar-avatar-btn"
              onClick={() => handleNavClick('photo')}
              title="View your private profile photo"
              aria-label="View local profile photo"
            >
              <img src={profile.photo} alt="Local Profile Preview" className="navbar-avatar-img" />
              <span className="status-dot-online" title="100% on device"></span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-secondary navbar-action-btn"
              onClick={() => handleNavClick('questionnaire')}
            >
              {profile.hasCompletedOnboarding ? 'Skin Profile' : 'Start Assessment'}
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-fade-in">
          <nav aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
