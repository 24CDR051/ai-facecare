import React from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { SKIN_TYPES, SKIN_CONCERNS } from '../../data/skincareKnowledge';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  CalendarCheck, 
  ArrowRight, 
  AlertCircle, 
  Edit3, 
  Camera, 
  Info,
  Droplets,
  Layers,
  Heart,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const DashboardScreen = () => {
  const { profile, routine, trackerData, navigateTo } = useSkinCare();

  const currentSkinTypeObj = SKIN_TYPES.find((t) => t.id === profile.skinType) || SKIN_TYPES[0];
  const activeConcernsObjs = SKIN_CONCERNS.filter((c) => profile.concerns.includes(c.id));

  // Today's tracker calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTracker = trackerData[todayStr] || { amCompleted: [], pmCompleted: [] };
  const totalAmSteps = routine.amRoutine?.length || 5;
  const totalPmSteps = routine.pmRoutine?.length || 4;
  const totalStepsToday = totalAmSteps + totalPmSteps;
  const completedTodayCount = (todayTracker.amCompleted?.length || 0) + (todayTracker.pmCompleted?.length || 0);
  const todayProgressPercent = Math.min(100, Math.round((completedTodayCount / totalStepsToday) * 100));

  return (
    <div className="dashboard-screen animate-fade-in">
      {/* Top Greeting & Banner */}
      <div className="dashboard-header-row">
        <div>
          <div className="badge badge-lavender">
            <Sparkles size={14} />
            <span>Personalized Care Center</span>
          </div>
          <h1 className="dashboard-title">Your Mindful Skin Overview</h1>
          <p className="dashboard-subtitle">
            Curated daily routines and barrier wellness habits tailored to your unique skin profile.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('questionnaire')}
            id="edit-preferences-btn"
          >
            <Edit3 size={15} />
            <span>Edit Skin Profile</span>
          </button>
        </div>
      </div>

      {/* Transparent Educational Simulation Banner */}
      <div className="simulated-dashboard-banner card">
        <div className="banner-icon-col">
          <Info size={22} className="text-amber" />
        </div>
        <div className="banner-text-col">
          <div className="banner-heading-row">
            <span className="badge badge-simulated">Simulated Demonstration</span>
            <span className="badge badge-sage">100% Offline Privacy</span>
          </div>
          <p className="banner-explanation">
            This skin profile and routine are synthesized dynamically using your self-reported preferences 
            and evidence-informed cosmetic skincare rules. <strong>No cloud AI image diagnosis or medical evaluation is performed.</strong>
          </p>
        </div>
      </div>

      {/* Main Grid: Skin Profile Card + Wellness Metrics */}
      <div className="dashboard-grid">
        {/* Left Column: Skin Profile Card */}
        <div className="skin-profile-card card">
          <div className="profile-card-top">
            <div className="profile-avatar-container">
              {profile.photo ? (
                <img 
                  src={profile.photo} 
                  alt="Your Profile Thumbnail" 
                  className="profile-avatar-img"
                  onClick={() => navigateTo('photo')}
                  title="Click to view or replace photo"
                />
              ) : (
                <div 
                  className="profile-avatar-placeholder" 
                  onClick={() => navigateTo('photo')}
                  title="Click to add optional photo"
                >
                  <Camera size={26} className="text-lavender" />
                  <span className="add-photo-mini">Add Photo</span>
                </div>
              )}
            </div>

            <div className="profile-info-col">
              <span className="profile-badge-type badge badge-lavender">
                {currentSkinTypeObj.title} Skin
              </span>
              <h2 className="profile-skin-title">{currentSkinTypeObj.title} Profile</h2>
              <p className="profile-skin-desc">{currentSkinTypeObj.description}</p>
            </div>
          </div>

          <hr className="divider" />

          {/* Key Profile Tags */}
          <div className="profile-attributes-grid">
            <div className="attribute-item">
              <span className="attr-label">Primary Focus:</span>
              <strong className="attr-value">{currentSkinTypeObj.focus}</strong>
            </div>

            <div className="attribute-item">
              <span className="attr-label">Active Concerns:</span>
              <div className="concerns-pill-list">
                {activeConcernsObjs.map((c) => (
                  <span key={c.id} className="badge badge-blush">{c.label}</span>
                ))}
              </div>
            </div>

            <div className="attribute-item">
              <span className="attr-label">Sensitivity Level:</span>
              <strong className="attr-value capitalize">{profile.sensitivity}</strong>
            </div>

            <div className="attribute-item">
              <span className="attr-label">Daily UV Exposure:</span>
              <strong className="attr-value capitalize">{profile.sunExposure}</strong>
            </div>
          </div>

          {/* Recommended Key Actives */}
          <div className="recommended-actives-section">
            <h4 className="actives-section-title">Key Active Ingredients for You:</h4>
            <div className="actives-tag-cloud">
              {currentSkinTypeObj.keyActives.map((active, idx) => (
                <span key={idx} className="active-tag">{active}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Educational Barrier & Wellness Scores */}
        <div className="wellness-metrics-card card">
          <div className="metrics-card-header">
            <div>
              <h3 className="metrics-title">Barrier Resilience Index</h3>
              <p className="metrics-sub">Calculated based on your sensitivity and climate exposures</p>
            </div>
            <div className="score-circle">
              <span className="score-number">{routine.barrierScore || 85}</span>
              <span className="score-denom">/100</span>
            </div>
          </div>

          <div className="metrics-bars-list">
            <div className="metric-row">
              <div className="metric-info-row">
                <span>Lipid Barrier Integrity</span>
                <strong>{routine.barrierScore || 85}%</strong>
              </div>
              <div className="metric-progress-track">
                <div 
                  className="metric-progress-fill bg-lavender" 
                  style={{ width: `${routine.barrierScore || 85}%` }}
                />
              </div>
            </div>

            <div className="metric-row">
              <div className="metric-info-row">
                <span>Hydration Reserve</span>
                <strong>{routine.hydrationScore || 78}%</strong>
              </div>
              <div className="metric-progress-track">
                <div 
                  className="metric-progress-fill bg-sage" 
                  style={{ width: `${routine.hydrationScore || 78}%` }}
                />
              </div>
            </div>

            <div className="metric-row">
              <div className="metric-info-row">
                <span>Daily UV Defense Need</span>
                <strong>{routine.sunScore || 90}%</strong>
              </div>
              <div className="metric-progress-track">
                <div 
                  className="metric-progress-fill bg-amber" 
                  style={{ width: `${routine.sunScore || 90}%` }}
                />
              </div>
            </div>
          </div>

          {/* Today's Tracker Quick Status */}
          <div className="today-tracker-snippet card">
            <div className="snippet-top">
              <div className="snippet-title-col">
                <CalendarCheck size={18} className="text-lavender" />
                <strong>Today's Routine Habit Tracker</strong>
              </div>
              <span className="badge badge-lavender">{completedTodayCount} of {totalStepsToday} Steps Done</span>
            </div>

            <div className="snippet-progress-bar">
              <div 
                className="snippet-progress-fill" 
                style={{ width: `${todayProgressPercent}%` }} 
              />
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm w-full"
              onClick={() => navigateTo('tracker')}
              id="open-tracker-btn"
            >
              <span>Check Off Steps in Tracker</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Routine Quick Glance Cards (AM & PM) */}
      <div className="routine-glance-section">
        <div className="section-header-row">
          <h2 className="section-title">Your Tailored Daily Regimen</h2>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('routines')}
            id="view-full-routines-btn"
          >
            <span>View Step-by-Step Instructions</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="routine-glance-grid">
          {/* AM Card */}
          <div className="glance-card card card-interactive" onClick={() => navigateTo('routines')}>
            <div className="glance-card-header">
              <div className="time-icon-box bg-amber-light">
                <Sun size={20} className="text-amber" />
              </div>
              <div>
                <h3 className="glance-time-title">Morning Routine</h3>
                <span className="glance-time-focus">Energize, Hydrate & UV Shield</span>
              </div>
              <span className="badge badge-amber">{routine.amRoutine?.length || 5} Steps</span>
            </div>

            <div className="glance-steps-list">
              {routine.amRoutine?.slice(0, 4).map((step, idx) => (
                <div key={step.id || idx} className="glance-step-item">
                  <span className="glance-step-num">{idx + 1}</span>
                  <div className="glance-step-details">
                    <strong className="glance-step-title">{step.title}</strong>
                    <span className="glance-step-sub">{step.category} • {step.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glance-card-footer">
              <span className="footer-link-text">Explore AM Routine & Tips →</span>
            </div>
          </div>

          {/* PM Card */}
          <div className="glance-card card card-interactive" onClick={() => navigateTo('routines')}>
            <div className="glance-card-header">
              <div className="time-icon-box bg-lavender-light">
                <Moon size={20} className="text-lavender" />
              </div>
              <div>
                <h3 className="glance-time-title">Evening Routine</h3>
                <span className="glance-time-focus">Deep Cleanse, Treat & Lipid Repair</span>
              </div>
              <span className="badge badge-lavender">{routine.pmRoutine?.length || 4} Steps</span>
            </div>

            <div className="glance-steps-list">
              {routine.pmRoutine?.slice(0, 4).map((step, idx) => (
                <div key={step.id || idx} className="glance-step-item">
                  <span className="glance-step-num">{idx + 1}</span>
                  <div className="glance-step-details">
                    <strong className="glance-step-title">{step.title}</strong>
                    <span className="glance-step-sub">{step.category} • {step.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glance-card-footer">
              <span className="footer-link-text">Explore PM Routine & Tips →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
