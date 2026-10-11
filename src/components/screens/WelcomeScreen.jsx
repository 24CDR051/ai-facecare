import React from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Moon, 
  CalendarCheck, 
  BookHeart, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Heart
} from 'lucide-react';

export const WelcomeScreen = () => {
  const { navigateTo, loadDemoData } = useSkinCare();

  return (
    <div className="welcome-screen animate-fade-in">
      {/* Hero Section */}
      <section className="welcome-hero-section">
        <div className="hero-content">
          <div className="hero-pill-badge badge badge-lavender">
            <Sparkles size={14} />
            <span>Mindful Skincare Companion</span>
          </div>

          <h1 className="hero-title">
            Care for your skin barrier with <span className="title-highlight">clarity, patience,</span> and science.
          </h1>

          <p className="hero-description">
            Demystify daily skincare routines, understand how gentle active ingredients interact, 
            and build lasting skin wellness habits. Designed with a strict privacy-first promise—your photos 
            and health reflections never leave your device.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo('questionnaire')}
              id="start-assessment-btn"
            >
              <span>Begin Skin Assessment</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={loadDemoData}
              id="sample-demo-btn"
            >
              <span>Explore Sample Profile Demo</span>
            </button>
          </div>

          {/* Privacy Trust Bar */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <Lock size={16} className="text-lavender" />
              <span>100% On-Device Sandbox</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} className="text-sage" />
              <span>No Cloud Photo Transmission</span>
            </div>
            <div className="trust-item">
              <Heart size={16} className="text-blush" />
              <span>Transparent Educational Logic</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual">
          <div className="visual-card card card-interactive">
            <div className="visual-card-header">
              <div className="badge badge-sage">
                <CheckCircle2 size={12} />
                <span>Balanced Barrier Routine</span>
              </div>
              <span className="routine-time-indicator">Morning & Night</span>
            </div>

            <div className="visual-preview-routine">
              <div className="preview-step">
                <span className="step-num">01</span>
                <div className="step-info">
                  <strong>Gentle Amino Cleanser</strong>
                  <span>Preserves acid mantle lipids</span>
                </div>
              </div>

              <div className="preview-step">
                <span className="step-num">02</span>
                <div className="step-info">
                  <strong>Centella Soothing Essence</strong>
                  <span>Quenches micro-redness & irritation</span>
                </div>
              </div>

              <div className="preview-step">
                <span className="step-num">03</span>
                <div className="step-info">
                  <strong>Ceramide Barrier Cream</strong>
                  <span>Locks in hydration & seals moisture</span>
                </div>
              </div>

              <div className="preview-step highlight-step">
                <span className="step-num">04</span>
                <div className="step-info">
                  <strong>Mineral Daily SPF 50</strong>
                  <span>Shields against daily photo-aging</span>
                </div>
              </div>
            </div>

            <div className="visual-card-footer">
              <span className="card-disclaimer-tag">✨ Simulated educational preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="features-grid-section">
        <div className="section-header text-center">
          <span className="section-subtitle badge badge-blush">Thoughtful Design</span>
          <h2 className="section-title">Everything you need for consistent, gentle skin habits</h2>
          <p className="section-description">
            No 12-step marketing gimmicks or unproven claims. Just clear guidance built around your skin's baseline.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon-box bg-lavender">
              <Sun size={24} className="text-lavender" />
            </div>
            <h3 className="feature-title">Tailored AM & PM Sequences</h3>
            <p className="feature-text">
              Understand the proper order of application—from pH-balanced cleansing to antioxidant protection in the morning, and restorative barrier nourishment at night.
            </p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon-box bg-blush">
              <Moon size={24} className="text-blush" />
            </div>
            <h3 className="feature-title">Science-Backed Actives</h3>
            <p className="feature-text">
              Demystify ingredients like Ceramides, Niacinamide, Azelaic Acid, and Cica. Learn what works harmoniously together and which harsh actives to avoid.
            </p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon-box bg-sage">
              <CalendarCheck size={24} className="text-sage" />
            </div>
            <h3 className="feature-title">Daily Habit & Streak Tracker</h3>
            <p className="feature-text">
              Skincare results require consistent practice over 4 to 8 weeks. Keep track of morning and evening completions with an intuitive calendar and streak counter.
            </p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon-box bg-amber">
              <BookHeart size={24} className="text-amber" />
            </div>
            <h3 className="feature-title">Private Skin Progress Journal</h3>
            <p className="feature-text">
              Log daily reflections, flare-ups, and optional photos safely in your browser. Document how hydration, diet, and stress affect your skin over time.
            </p>
          </div>
        </div>
      </section>

      {/* Transparency & Safety Guarantee */}
      <section className="transparency-banner-section card">
        <div className="transparency-content">
          <div className="badge badge-simulated">
            <ShieldCheck size={14} />
            <span>Honesty & Ethical AI Standard</span>
          </div>
          <h3 className="transparency-title">Our Transparent Promise to You</h3>
          <p className="transparency-desc">
            Unlike marketing apps that promise magical diagnostic AI scans, AI FaceCare is explicit:
            <strong> all analysis and routines are simulated educational templates based on your self-reported inputs.</strong>
            We do not pretend to perform medical diagnoses, and we never transmit your photos to any remote server.
          </p>
          <div className="transparency-actions">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigateTo('privacy')}
            >
              Review Privacy & Data Controls
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => navigateTo('questionnaire')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
