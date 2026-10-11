import React, { useState } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { 
  SKIN_TYPES, 
  SKIN_CONCERNS, 
  SENSITIVITY_LEVELS, 
  SUN_EXPOSURES, 
  ROUTINE_EXPERIENCE 
} from '../../data/skincareKnowledge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  HelpCircle,
  Droplets,
  Layers,
  Shield,
  Smile,
  AlertCircle,
  Sun,
  Heart,
  Clock,
  Grid
} from 'lucide-react';

export const QuestionnaireScreen = () => {
  const { profile, updateProfile, completeOnboarding, navigateTo } = useSkinCare();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Local draft state initialized from context
  const [formData, setFormData] = useState({
    skinType: profile.skinType || 'combination',
    concerns: profile.concerns || ['dehydration'],
    sensitivity: profile.sensitivity || 'moderate',
    sunExposure: profile.sunExposure || 'moderate',
    experience: profile.experience || 'balanced',
    preferences: {
      fragranceFree: profile.preferences?.fragranceFree ?? true,
      crueltyFree: profile.preferences?.crueltyFree ?? true,
      minimalSteps: profile.preferences?.minimalSteps ?? false
    }
  });

  const handleConcernToggle = (concernId) => {
    setFormData((prev) => {
      const exists = prev.concerns.includes(concernId);
      const updated = exists
        ? prev.concerns.filter((c) => c !== concernId)
        : [...prev.concerns, concernId];
      // Ensure at least 1 concern is picked
      return { ...prev, concerns: updated.length > 0 ? updated : [concernId] };
    });
  };

  const handleFinish = (proceedToPhoto = false) => {
    updateProfile(formData);
    if (proceedToPhoto) {
      navigateTo('photo');
    } else {
      completeOnboarding(formData);
    }
  };

  // Icon mapping helper
  const getSkinTypeIcon = (id) => {
    switch (id) {
      case 'dry': return <Droplets size={24} className="text-lavender" />;
      case 'oily': return <Sparkles size={24} className="text-blush" />;
      case 'combination': return <Layers size={24} className="text-lavender" />;
      case 'sensitive': return <Shield size={24} className="text-sage" />;
      default: return <Smile size={24} className="text-amber" />;
    }
  };

  const getConcernIcon = (id) => {
    switch (id) {
      case 'breakouts': return <AlertCircle size={20} className="text-blush" />;
      case 'dehydration': return <Droplets size={20} className="text-lavender" />;
      case 'dullness': return <Sun size={20} className="text-amber" />;
      case 'redness': return <Heart size={20} className="text-blush" />;
      case 'fine_lines': return <Clock size={20} className="text-lavender" />;
      case 'texture': return <Grid size={20} className="text-sage" />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div className="questionnaire-screen animate-fade-in">
      <div className="questionnaire-container">
        {/* Header & Step Tracker */}
        <div className="questionnaire-header">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
              role="progressbar"
              aria-valuenow={(step / totalSteps) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <div className="step-badge-row">
            <span className="badge badge-lavender">Step {step} of {totalSteps}</span>
            <span className="step-privacy-note">
              <ShieldCheck size={14} className="text-sage" /> Saved to local device
            </span>
          </div>
        </div>

        {/* STEP 1: SKIN TYPE */}
        {step === 1 && (
          <div className="step-content card animate-fade-in">
            <div className="step-heading">
              <h2 className="step-title">What is your primary skin type?</h2>
              <p className="step-subtitle">
                How does your bare skin typically feel 2 hours after washing with a gentle cleanser?
              </p>
            </div>

            <div className="options-grid">
              {SKIN_TYPES.map((type) => {
                const isSelected = formData.skinType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, skinType: type.id })}
                    aria-pressed={isSelected}
                  >
                    <div className="option-icon-row">
                      {getSkinTypeIcon(type.id)}
                      {isSelected && <span className="selection-check"><Check size={16} /></span>}
                    </div>
                    <h3 className="option-name">{type.title}</h3>
                    <p className="option-desc">{type.description}</p>
                    <div className="option-meta">
                      <span className="meta-label">Primary Need:</span> {type.focus}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PRIMARY CONCERNS */}
        {step === 2 && (
          <div className="step-content card animate-fade-in">
            <div className="step-heading">
              <h2 className="step-title">Select your top skin concerns</h2>
              <p className="step-subtitle">
                Choose the areas you'd like your morning and evening routine to address first.
              </p>
            </div>

            <div className="concerns-grid">
              {SKIN_CONCERNS.map((item) => {
                const isSelected = formData.concerns.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`concern-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleConcernToggle(item.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="concern-left">
                      <span className="concern-icon">{getConcernIcon(item.id)}</span>
                      <div className="concern-text">
                        <strong className="concern-label">{item.label}</strong>
                        <span className="concern-desc">{item.desc}</span>
                      </div>
                    </div>
                    <div className={`checkbox-indicator ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SENSITIVITY & REACTIVITY */}
        {step === 3 && (
          <div className="step-content card animate-fade-in">
            <div className="step-heading">
              <h2 className="step-title">How sensitive is your skin to active ingredients?</h2>
              <p className="step-subtitle">
                This helps us recommend gentle alternatives and avoid harsh acids or synthetic fragrances.
              </p>
            </div>

            <div className="list-options">
              {SENSITIVITY_LEVELS.map((lvl) => {
                const isSelected = formData.sensitivity === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    className={`list-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, sensitivity: lvl.id })}
                    aria-pressed={isSelected}
                  >
                    <div className="list-option-info">
                      <strong className="list-option-title">{lvl.label}</strong>
                      <p className="list-option-desc">{lvl.desc}</p>
                    </div>
                    <div className={`radio-indicator ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <span className="radio-dot" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: SUN EXPOSURE & LIFESTYLE */}
        {step === 4 && (
          <div className="step-content card animate-fade-in">
            <div className="step-heading">
              <h2 className="step-title">What is your typical daily sun exposure?</h2>
              <p className="step-subtitle">
                UV rays and ambient blue light dictate sunscreen weight and morning antioxidant defense.
              </p>
            </div>

            <div className="list-options">
              {SUN_EXPOSURES.map((sun) => {
                const isSelected = formData.sunExposure === sun.id;
                return (
                  <button
                    key={sun.id}
                    type="button"
                    className={`list-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, sunExposure: sun.id })}
                    aria-pressed={isSelected}
                  >
                    <div className="list-option-info">
                      <strong className="list-option-title">{sun.label}</strong>
                      <p className="list-option-desc">{sun.desc}</p>
                    </div>
                    <div className={`radio-indicator ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <span className="radio-dot" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: ROUTINE DEPTH & FORMULATION PREFERENCES */}
        {step === 5 && (
          <div className="step-content card animate-fade-in">
            <div className="step-heading">
              <h2 className="step-title">How many steps do you prefer in your daily routine?</h2>
              <p className="step-subtitle">
                We design routines you can actually stick to without feeling overwhelmed.
              </p>
            </div>

            <div className="experience-cards-grid">
              {ROUTINE_EXPERIENCE.map((exp) => {
                const isSelected = formData.experience === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    className={`exp-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, experience: exp.id })}
                    aria-pressed={isSelected}
                  >
                    <div className="exp-card-header">
                      <strong>{exp.label}</strong>
                      {isSelected && <Check size={16} className="text-lavender" />}
                    </div>
                    <p className="exp-desc">{exp.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="preferences-toggles-section">
              <h4 className="preferences-title">Formula Preferences</h4>
              <div className="toggles-grid">
                <label className="toggle-label-card">
                  <input
                    type="checkbox"
                    checked={formData.preferences.fragranceFree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, fragranceFree: e.target.checked }
                      })
                    }
                  />
                  <span>Fragrance-Free Formulation (Recommended for barrier health)</span>
                </label>

                <label className="toggle-label-card">
                  <input
                    type="checkbox"
                    checked={formData.preferences.crueltyFree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, crueltyFree: e.target.checked }
                      })
                    }
                  />
                  <span>Cruelty-Free / Vegan Friendly</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <div className="questionnaire-nav-row">
          {step > 1 ? (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigateTo('welcome')}
            >
              Cancel
            </button>
          )}

          <div className="forward-nav-actions">
            {step < totalSteps ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep(step + 1)}
                id="next-step-btn"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div className="finish-buttons-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleFinish(true)}
                  id="add-photo-flow-btn"
                >
                  <Camera size={16} />
                  <span>Optional Photo Step</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleFinish(false)}
                  id="generate-routine-btn"
                >
                  <Sparkles size={16} />
                  <span>Generate Custom Routine</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
