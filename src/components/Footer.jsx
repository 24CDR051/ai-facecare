import React from 'react';
import { useSkinCare } from '../context/SkinCareContext';
import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useSkinCare();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Medical & AI Transparency Notice */}
        <div className="footer-disclaimer-card card">
          <div className="disclaimer-header">
            <HeartHandshake className="disclaimer-icon text-lavender" size={22} />
            <div>
              <h4 className="disclaimer-title">Educational Wellness Companion & Transparency Notice</h4>
              <p className="disclaimer-text">
                AI FaceCare provides evidence-informed cosmetic skincare education, routine organization, and habit tracking. 
                <strong> This application does not diagnose dermatological diseases, provide medical treatment, or replace evaluation by a board-certified dermatologist.</strong> 
                Analysis results are strictly simulated using self-reported questionnaire responses and established cosmetic guidelines.
              </p>
            </div>
          </div>
          <div className="disclaimer-meta">
            <div className="privacy-pill">
              <ShieldCheck size={16} className="text-sage" />
              <span>100% Client-Side Privacy: Your photos and notes never leave your personal device.</span>
            </div>
          </div>
        </div>

        {/* Footer Links & Branding */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="footer-brand-title font-serif">AI FaceCare</span>
            <span className="footer-brand-tagline">Crafted with gentle care for mindful skin wellness.</span>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => navigateTo('welcome')}>Welcome</button>
            <button type="button" onClick={() => navigateTo('questionnaire')}>Skin Questionnaire</button>
            <button type="button" onClick={() => navigateTo('routines')}>AM / PM Routines</button>
            <button type="button" onClick={() => navigateTo('tracker')}>Habit Tracker</button>
            <button type="button" onClick={() => navigateTo('products')}>Product Directory</button>
            <button type="button" onClick={() => navigateTo('privacy')}>Privacy & Data Controls</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
