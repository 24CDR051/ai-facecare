import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_PROFILE, PRODUCT_CATALOG, INGREDIENT_GLOSSARY } from '../data/skincareKnowledge';
import { generatePersonalizedRoutine } from '../utils/routineEngine';

const SkinCareContext = createContext();

const STORAGE_KEYS = {
  PROFILE: 'aifacecare_profile_v1',
  ROUTINE: 'aifacecare_routine_v1',
  TRACKER: 'aifacecare_tracker_v1',
  JOURNAL: 'aifacecare_journal_v1',
  CURRENT_SCREEN: 'aifacecare_screen_v1'
};

export const SkinCareProvider = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // 2. Active Screen State
  const [currentScreen, setCurrentScreen] = useState(() => {
    try {
      const savedScreen = localStorage.getItem(STORAGE_KEYS.CURRENT_SCREEN);
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;
      if (parsedProfile && parsedProfile.hasCompletedOnboarding) {
        return savedScreen || 'dashboard';
      }
      return 'welcome';
    } catch {
      return 'welcome';
    }
  });

  // 3. Routines State
  const [routine, setRoutine] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROUTINE);
      if (saved) return JSON.parse(saved);
      return generatePersonalizedRoutine(INITIAL_USER_PROFILE);
    } catch {
      return generatePersonalizedRoutine(INITIAL_USER_PROFILE);
    }
  });

  // 4. Daily Habit Tracker State (key: YYYY-MM-DD)
  const [trackerData, setTrackerData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRACKER);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Skin Journal / Progress Notes
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved) return JSON.parse(saved);
      // Default sample journal entry so users immediately see how progress tracking works
      return [
        {
          id: 'initial-sample-log',
          date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
          rating: 3,
          tags: ['Hydrated Well', 'Wore Daily SPF', 'Slight Cheeks Tightness'],
          notes: 'Started focusing on gentle cleansing instead of foaming scrub. Cheeks feel less tight after applying ceramide cream.',
          photo: null,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // 6. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', duration = 3500) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.id === toast?.id ? null : prev));
    }, duration);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage profile sync warning:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTINE, JSON.stringify(routine));
    } catch (e) {
      console.warn('LocalStorage routine sync warning:', e);
    }
  }, [routine]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKER, JSON.stringify(trackerData));
    } catch (e) {
      console.warn('LocalStorage tracker sync warning:', e);
    }
  }, [trackerData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalEntries));
    } catch (e) {
      console.warn('LocalStorage journal sync warning:', e);
    }
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SCREEN, currentScreen);
    } catch (e) {
      console.warn('LocalStorage screen sync warning:', e);
    }
  }, [currentScreen]);

  // Methods
  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (newFields) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newFields };
      // Regenerate routine automatically if preferences change
      const newRoutine = generatePersonalizedRoutine(updated);
      setRoutine(newRoutine);
      return updated;
    });
  };

  const completeOnboarding = (profileData) => {
    const updated = { ...profile, ...profileData, hasCompletedOnboarding: true };
    setProfile(updated);
    const newRoutine = generatePersonalizedRoutine(updated);
    setRoutine(newRoutine);
    navigateTo('dashboard');
    showToast('Your custom routine has been created!', 'success');
  };

  const updatePhoto = (photoDataUrl) => {
    setProfile((prev) => ({ ...prev, photo: photoDataUrl }));
    showToast('Photo saved locally in device memory.', 'success');
  };

  const removePhoto = () => {
    setProfile((prev) => ({ ...prev, photo: null }));
    showToast('Photo removed from local device cache.', 'info');
  };

  // Routine Step completion toggle for today's tracker
  const toggleTrackerStep = (dateKey, timeSlot, stepId) => {
    setTrackerData((prev) => {
      const dayData = prev[dateKey] || { amCompleted: [], pmCompleted: [] };
      const currentSlotList = dayData[timeSlot === 'am' ? 'amCompleted' : 'pmCompleted'] || [];

      const exists = currentSlotList.includes(stepId);
      const updatedSlotList = exists
        ? currentSlotList.filter((id) => id !== stepId)
        : [...currentSlotList, stepId];

      const updatedDayData = {
        ...dayData,
        [timeSlot === 'am' ? 'amCompleted' : 'pmCompleted']: updatedSlotList
      };

      return {
        ...prev,
        [dateKey]: updatedDayData
      };
    });
  };

  const addCustomRoutineStep = (timeSlot, newStep) => {
    setRoutine((prev) => {
      const key = timeSlot === 'am' ? 'amRoutine' : 'pmRoutine';
      const existing = prev[key] || [];
      const updated = [
        ...existing,
        {
          ...newStep,
          id: `custom-${Date.now()}`,
          isCustom: true
        }
      ];
      return { ...prev, [key]: updated };
    });
    showToast('Custom step added to your routine.', 'success');
  };

  const removeRoutineStep = (timeSlot, stepId) => {
    setRoutine((prev) => {
      const key = timeSlot === 'am' ? 'amRoutine' : 'pmRoutine';
      const filtered = (prev[key] || []).filter((s) => s.id !== stepId);
      return { ...prev, [key]: filtered };
    });
    showToast('Step removed from routine.', 'info');
  };

  // Journal Methods
  const addJournalEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: `journal-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
    showToast('Skin progress note saved.', 'success');
  };

  const deleteJournalEntry = (entryId) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== entryId));
    showToast('Journal note deleted.', 'info');
  };

  // Reset & Clear All Local Data
  const clearAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.ROUTINE);
      localStorage.removeItem(STORAGE_KEYS.TRACKER);
      localStorage.removeItem(STORAGE_KEYS.JOURNAL);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SCREEN);
    } catch (e) {
      console.warn('Clear error', e);
    }
    setProfile(INITIAL_USER_PROFILE);
    setRoutine(generatePersonalizedRoutine(INITIAL_USER_PROFILE));
    setTrackerData({});
    setJournalEntries([]);
    setCurrentScreen('welcome');
    showToast('All local application data has been purged.', 'info');
  };

  // Export Data as JSON
  const exportAllData = () => {
    const exportPayload = {
      app: 'AI FaceCare',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: { ...profile, photo: profile.photo ? '[Photo Base64 included]' : null },
      routine,
      trackerData,
      journalEntries: journalEntries.map((j) => ({ ...j, photo: j.photo ? '[Thumbnail included]' : null }))
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ai_facecare_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Export file downloaded successfully.', 'success');
  };

  // Load Sample Profile Demo
  const loadDemoData = () => {
    const demoProfile = {
      skinType: 'combination',
      concerns: ['dehydration', 'breakouts', 'texture'],
      sensitivity: 'moderate',
      sunExposure: 'moderate',
      experience: 'balanced',
      preferences: {
        fragranceFree: true,
        crueltyFree: true,
        minimalSteps: false
      },
      photo: null,
      hasCompletedOnboarding: true
    };
    setProfile(demoProfile);
    const demoRoutine = generatePersonalizedRoutine(demoProfile);
    setRoutine(demoRoutine);

    // Add some sample tracker checkmarks for today
    const today = new Date().toISOString().split('T')[0];
    setTrackerData({
      [today]: {
        amCompleted: ['am-1', 'am-2'],
        pmCompleted: []
      }
    });

    navigateTo('dashboard');
    showToast('Loaded sample profile & tailored routine.', 'success');
  };

  return (
    <SkinCareContext.Provider
      value={{
        profile,
        routine,
        trackerData,
        journalEntries,
        currentScreen,
        toast,
        showToast,
        navigateTo,
        updateProfile,
        completeOnboarding,
        updatePhoto,
        removePhoto,
        toggleTrackerStep,
        addCustomRoutineStep,
        removeRoutineStep,
        addJournalEntry,
        deleteJournalEntry,
        clearAllData,
        exportAllData,
        loadDemoData,
        products: PRODUCT_CATALOG,
        ingredients: INGREDIENT_GLOSSARY
      }}
    >
      {children}
    </SkinCareContext.Provider>
  );
};

export const useSkinCare = () => {
  const context = useContext(SkinCareContext);
  if (!context) {
    throw new Error('useSkinCare must be used within a SkinCareProvider');
  }
  return context;
};
