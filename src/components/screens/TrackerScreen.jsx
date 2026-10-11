import React, { useState, useEffect } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import confetti from 'canvas-confetti';
import { 
  CalendarCheck, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Circle, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Info,
  Clock
} from 'lucide-react';

export const TrackerScreen = () => {
  const { routine, trackerData, toggleTrackerStep, showToast } = useSkinCare();

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === todayStr;

  const dayTracker = trackerData[selectedDate] || { amCompleted: [], pmCompleted: [] };
  const amSteps = routine.amRoutine || [];
  const pmSteps = routine.pmRoutine || [];

  const totalSteps = amSteps.length + pmSteps.length;
  const completedCount = (dayTracker.amCompleted?.length || 0) + (dayTracker.pmCompleted?.length || 0);
  const percentComplete = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Calculate consistency streak (consecutive days with at least 1 routine completed)
  const calculateStreak = () => {
    let streak = 0;
    let checkDate = new Date();
    // Check up to last 30 days
    for (let i = 0; i < 30; i++) {
      const dateKey = checkDate.toISOString().split('T')[0];
      const entry = trackerData[dateKey];
      if (entry && ((entry.amCompleted?.length > 0) || (entry.pmCompleted?.length > 0))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has no entries yet, don't break streak if yesterday was completed
        if (i === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return Math.max(streak, 1);
  };

  const streakCount = calculateStreak();

  // Trigger celebratory confetti on complete
  useEffect(() => {
    if (percentComplete === 100 && totalSteps > 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#8F73A8', '#D98297', '#5E8268', '#FAF8F5']
        });
      } catch {
        // ignore if canvas not supported
      }
    }
  }, [percentComplete, totalSteps]);

  const changeDateBy = (days) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const formattedDateString = new Date(selectedDate + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="tracker-screen animate-fade-in">
      {/* Header */}
      <div className="tracker-header">
        <div>
          <div className="badge badge-lavender">
            <CalendarCheck size={14} />
            <span>Habit Mastery</span>
          </div>
          <h1 className="tracker-title">Daily Skincare Tracker</h1>
          <p className="tracker-subtitle">
            Consistency is the cornerstone of skin barrier repair. Check off your morning and evening rituals.
          </p>
        </div>

        {/* Streak Badge */}
        <div className="streak-badge-card card">
          <div className="streak-icon-box">
            <Flame size={24} className="text-blush" />
          </div>
          <div className="streak-text-col">
            <strong className="streak-count">{streakCount} Day Streak</strong>
            <span className="streak-sub">Keep the momentum going!</span>
          </div>
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="tracker-date-bar card">
        <button
          type="button"
          className="btn-icon"
          onClick={() => changeDateBy(-1)}
          aria-label="Previous day"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="current-date-info">
          <span className="date-display-text">{formattedDateString}</span>
          {isToday && <span className="badge badge-sage">Today</span>}
        </div>

        <button
          type="button"
          className="btn-icon"
          onClick={() => changeDateBy(1)}
          aria-label="Next day"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Metric Ring Card */}
      <div className="tracker-progress-summary card">
        <div className="summary-left">
          <h3 className="summary-title">
            {percentComplete === 100 
              ? '✨ Full Regimen Complete Today!' 
              : `${completedCount} of ${totalSteps} Steps Complete`}
          </h3>
          <p className="summary-desc">
            {percentComplete === 100 
              ? 'Excellent commitment to your skin barrier wellness.'
              : 'Take your time and treat each step as a mindful pause in your day.'}
          </p>

          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill bg-lavender" 
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        <div className="summary-percent-circle">
          <span className="percent-val">{percentComplete}%</span>
        </div>
      </div>

      {/* Dual Checklist: AM & PM */}
      <div className="checklists-grid">
        {/* Morning Checklist */}
        <div className="checklist-column card">
          <div className="checklist-header">
            <div className="time-badge-icon bg-amber-light">
              <Sun size={20} className="text-amber" />
            </div>
            <div>
              <h3 className="checklist-time-title">Morning Checklist</h3>
              <span className="checklist-sub">Protect & Hydrate</span>
            </div>
          </div>

          <div className="checklist-items-list">
            {amSteps.map((step, idx) => {
              const isChecked = dayTracker.amCompleted?.includes(step.id);
              return (
                <div 
                  key={step.id || idx}
                  className={`check-item-row ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleTrackerStep(selectedDate, 'am', step.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTrackerStep(selectedDate, 'am', step.id);
                    }
                  }}
                >
                  <div className={`checkbox-custom ${isChecked ? 'active' : ''}`}>
                    {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>

                  <div className="check-item-text">
                    <strong className="check-item-title">{step.title}</strong>
                    <span className="check-item-meta">{step.category} • {step.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evening Checklist */}
        <div className="checklist-column card">
          <div className="checklist-header">
            <div className="time-badge-icon bg-lavender-light">
              <Moon size={20} className="text-lavender" />
            </div>
            <div>
              <h3 className="checklist-time-title">Evening Checklist</h3>
              <span className="checklist-sub">Cleanse & Restore</span>
            </div>
          </div>

          <div className="checklist-items-list">
            {pmSteps.map((step, idx) => {
              const isChecked = dayTracker.pmCompleted?.includes(step.id);
              return (
                <div 
                  key={step.id || idx}
                  className={`check-item-row ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleTrackerStep(selectedDate, 'pm', step.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTrackerStep(selectedDate, 'pm', step.id);
                    }
                  }}
                >
                  <div className={`checkbox-custom ${isChecked ? 'active' : ''}`}>
                    {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </div>

                  <div className="check-item-text">
                    <strong className="check-item-title">{step.title}</strong>
                    <span className="check-item-meta">{step.category} • {step.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
