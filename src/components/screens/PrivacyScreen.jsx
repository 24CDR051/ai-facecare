import React, { useState } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { calculateLocalStorageUsage } from '../../utils/imageUtils';
import { Modal } from '../Modal';
import { 
  ShieldCheck, 
  Trash2, 
  Download, 
  RotateCcw, 
  Lock, 
  HardDrive, 
  AlertTriangle, 
  HeartHandshake, 
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const PrivacyScreen = () => {
  const { 
    clearAllData, 
    exportAllData, 
    navigateTo, 
    profile, 
    journalEntries, 
    trackerData 
  } = useSkinCare();

  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const storageUsage = calculateLocalStorageUsage();

  const handleConfirmClear = () => {
    clearAllData();
    setIsConfirmClearOpen(false);
  };

  return (
    <div className="privacy-screen animate-fade-in">
      <div className="privacy-header">
        <div>
          <div className="badge badge-lavender">
            <ShieldCheck size={14} />
            <span>Data Sovereignty & Transparency</span>
          </div>
          <h1 className="privacy-title">Privacy Architecture & Data Controls</h1>
          <p className="privacy-subtitle">
            Your skin journey is personal. AI FaceCare is built with an offline-first, client-only privacy model.
          </p>
        </div>
      </div>

      {/* Core Privacy Pillars */}
      <div className="privacy-pillars-grid">
        <div className="pillar-card card">
          <div className="pillar-icon-box bg-sage">
            <Lock size={22} className="text-sage" />
          </div>
          <h3 className="pillar-title">100% Client-Side Sandbox</h3>
          <p className="pillar-text">
            All profile questionnaire responses, routine settings, journal notes, and photos 
            are stored strictly inside your browser's private `localStorage` partition.
          </p>
        </div>

        <div className="pillar-card card">
          <div className="pillar-icon-box bg-lavender">
            <HardDrive size={22} className="text-lavender" />
          </div>
          <h3 className="pillar-title">Zero Cloud Transmission</h3>
          <p className="pillar-text">
            No remote backend servers, cloud databases, or tracking cookies exist in this prototype. 
            Photos never touch an external computer vision endpoint.
          </p>
        </div>

        <div className="pillar-card card">
          <div className="pillar-icon-box bg-amber">
            <AlertTriangle size={22} className="text-amber" />
          </div>
          <h3 className="pillar-title">Simulated Analysis Notice</h3>
          <p className="pillar-text">
            We explicitly state that all skin barrier scores and recommendations are simulated educational 
            demonstrations based on self-reported inputs—never automated clinical diagnoses.
          </p>
        </div>
      </div>

      {/* Storage & Data Breakdown Card */}
      <div className="storage-breakdown-card card">
        <div className="card-top-row">
          <div>
            <h3 className="breakdown-title font-serif">Local Storage Footprint</h3>
            <p className="breakdown-sub">Estimated space occupied in your browser's storage</p>
          </div>
          <div className="storage-stat-pill">
            <HardDrive size={16} className="text-lavender" />
            <strong>{storageUsage.kilobytes} KB ({storageUsage.megabytes} MB)</strong>
          </div>
        </div>

        <div className="storage-items-list">
          <div className="storage-item">
            <div className="storage-item-label">
              <CheckCircle2 size={16} className="text-sage" />
              <span>Skin Profile & Preferences</span>
            </div>
            <span className="badge badge-lavender">Active ({profile.skinType} skin)</span>
          </div>

          <div className="storage-item">
            <div className="storage-item-label">
              <CheckCircle2 size={16} className="text-sage" />
              <span>Uploaded Photo Reference</span>
            </div>
            <span className={`badge ${profile.photo ? 'badge-sage' : 'badge-outline'}`}>
              {profile.photo ? 'Stored Locally (Canvas Compressed)' : 'None Uploaded'}
            </span>
          </div>

          <div className="storage-item">
            <div className="storage-item-label">
              <CheckCircle2 size={16} className="text-sage" />
              <span>Skin Reflection Journal Entries</span>
            </div>
            <span className="badge badge-lavender">{journalEntries.length} entries</span>
          </div>

          <div className="storage-item">
            <div className="storage-item-label">
              <CheckCircle2 size={16} className="text-sage" />
              <span>Daily Routine Tracker History</span>
            </div>
            <span className="badge badge-lavender">
              {Object.keys(trackerData).length} days recorded
            </span>
          </div>
        </div>
      </div>

      {/* User Actions: Export Data, Retake Questionnaire, Purge All */}
      <div className="data-actions-grid">
        {/* Export Data Card */}
        <div className="action-card card">
          <div className="action-card-header">
            <Download size={20} className="text-lavender" />
            <h4 className="action-card-title">Export Your Personal Data</h4>
          </div>
          <p className="action-card-desc">
            Download a portable, unencrypted `.json` backup containing your routine configurations, habit logs, and journal reflections.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={exportAllData}
            id="export-data-btn"
          >
            <Download size={16} />
            <span>Export Data as JSON</span>
          </button>
        </div>

        {/* Retake Questionnaire Card */}
        <div className="action-card card">
          <div className="action-card-header">
            <RotateCcw size={20} className="text-sage" />
            <h4 className="action-card-title">Retake Skin Assessment</h4>
          </div>
          <p className="action-card-desc">
            Have your skin needs or climate changed? Update your questionnaire responses to generate a refreshed routine sequence.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigateTo('questionnaire')}
            id="retake-assessment-btn"
          >
            <RotateCcw size={16} />
            <span>Re-run Assessment</span>
          </button>
        </div>

        {/* Clear All Stored Data Card */}
        <div className="action-card card danger-card">
          <div className="action-card-header">
            <Trash2 size={20} className="text-danger" />
            <h4 className="action-card-title text-danger">Purge Stored Data</h4>
          </div>
          <p className="action-card-desc">
            Permanently wipe all preferences, photos, tracker streaks, and progress journal entries from this browser's local memory.
          </p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setIsConfirmClearOpen(true)}
            id="clear-all-data-btn"
          >
            <Trash2 size={16} />
            <span>Clear All Local Data</span>
          </button>
        </div>
      </div>

      {/* Comprehensive Medical Disclaimer Box */}
      <div className="medical-disclaimer-box card">
        <div className="disclaimer-title-row">
          <HeartHandshake size={22} className="text-blush" />
          <h3 className="font-serif">Comprehensive Dermatological & Medical Disclaimer</h3>
        </div>
        <div className="disclaimer-content-body">
          <p>
            1. <strong>Not Medical Advice:</strong> The information, suggestions, and routines provided within AI FaceCare are for general educational and cosmetic wellness purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            2. <strong>No Disease Diagnosis:</strong> This application does not diagnose, treat, or prevent any skin condition or disease, including but not limited to cystic acne, rosacea, eczema, psoriasis, dermatitis, melasma, or skin cancer.
          </p>
          <p>
            3. <strong>Patch Testing Recommendation:</strong> Always perform a patch test for 24-48 hours on a small patch of skin prior to incorporating any new topical skincare formulation or active acid into your regimen.
          </p>
          <p>
            4. <strong>Consult a Professional:</strong> Always seek the guidance of a board-certified dermatologist, physician, or qualified healthcare provider with any questions regarding a medical skin condition. Never disregard professional medical advice because of something you have read in this software.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmClearOpen}
        onClose={() => setIsConfirmClearOpen(false)}
        title="Confirm Purge of All Local Data"
      >
        <div className="confirm-modal-body">
          <AlertTriangle size={36} className="text-danger" />
          <p className="confirm-modal-text">
            Are you sure you want to delete all stored information? This will reset your skin profile, 
            purge any cached photo, and delete all habit tracker logs and skin journal notes. 
            This action cannot be undone.
          </p>
          <div className="modal-actions-row">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsConfirmClearOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmClear}
              id="confirm-delete-button"
            >
              Yes, Purge Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
