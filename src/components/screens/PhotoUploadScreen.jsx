import React, { useState, useRef } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { compressImageClientSide } from '../../utils/imageUtils';
import { Modal } from '../Modal';
import { 
  Camera, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  FileText
} from 'lucide-react';

export const PhotoUploadScreen = () => {
  const { profile, updatePhoto, removePhoto, navigateTo, completeOnboarding } = useSkinCare();
  const fileInputRef = useRef(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setIsProcessing(true);

    try {
      // Client-side compression to safe dimensions without sending bytes to any server
      const result = await compressImageClientSide(file, 600, 600, 0.82);
      updatePhoto(result.dataUrl);
      setCompressionStats({
        origKb: (result.originalSize / 1024).toFixed(0),
        compKb: (result.compressedSize / 1024).toFixed(0)
      });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to process selected image file.');
    } finally {
      setIsProcessing(false);
      // Reset input value so same file can be re-selected if desired
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    removePhoto();
    setCompressionStats(null);
  };

  const handleProceed = () => {
    if (!profile.hasCompletedOnboarding) {
      completeOnboarding({});
    } else {
      navigateTo('dashboard');
    }
  };

  return (
    <div className="photo-screen animate-fade-in">
      <div className="photo-container">
        {/* Header */}
        <div className="photo-header text-center">
          <div className="badge badge-lavender">
            <Camera size={14} />
            <span>Optional Photo Sandbox</span>
          </div>
          <h2 className="photo-title">Skin Visual Reference & Progress Journal</h2>
          <p className="photo-subtitle">
            Upload an optional bare-faced photo to observe your skin journey over time. 
            All images are securely processed entirely within your browser.
          </p>
        </div>

        {/* Client-Side Privacy Guarantee Banner */}
        <div className="privacy-callout-banner card">
          <div className="callout-icon-box">
            <ShieldCheck size={28} className="text-sage" />
          </div>
          <div className="callout-content">
            <h4 className="callout-title">100% Client-Side Privacy Guarantee</h4>
            <p className="callout-text">
              Your photo is <strong>never uploaded to the internet or external servers</strong>. 
              It is downsampled directly inside your browser's local memory to save space and stored safely 
              in your browser cache. You can view, replace, or completely delete it at any time.
            </p>
            <div className="callout-badges">
              <span className="badge badge-sage">Zero Cloud Telemetry</span>
              <span className="badge badge-simulated">Simulated Demo Analysis Only</span>
            </div>
          </div>
        </div>

        {/* Main Photo Sandbox Card */}
        <div className="photo-sandbox-card card">
          {profile.photo ? (
            /* Uploaded Preview View */
            <div className="photo-preview-section animate-fade-in">
              <div className="preview-image-wrapper">
                <img 
                  src={profile.photo} 
                  alt="Your local skin visual preview" 
                  className="preview-image-element"
                />
                <div className="image-overlay-badge">
                  <ShieldCheck size={14} />
                  <span>Stored on Device Only</span>
                </div>
              </div>

              {compressionStats && (
                <div className="compression-info-bar">
                  <Info size={14} className="text-lavender" />
                  <span>
                    Optimized locally from {compressionStats.origKb} KB to {compressionStats.compKb} KB for instant offline loading.
                  </span>
                </div>
              )}

              {/* Photo Action Buttons */}
              <div className="photo-controls-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsPreviewModalOpen(true)}
                  id="preview-photo-modal-btn"
                >
                  <Eye size={16} />
                  <span>Enlarge Preview</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  id="replace-photo-btn"
                >
                  <RefreshCw size={16} className={isProcessing ? 'spin' : ''} />
                  <span>Replace Photo</span>
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleRemove}
                  id="remove-photo-btn"
                >
                  <Trash2 size={16} />
                  <span>Remove Photo</span>
                </button>
              </div>

              {/* Explicit Educational Transparency Notice */}
              <div className="simulated-notice-card">
                <div className="notice-header">
                  <AlertTriangle size={18} className="text-amber" />
                  <strong>Educational Note on Image Analysis:</strong>
                </div>
                <p>
                  AI FaceCare does not run undisclosed computer vision or fake diagnostic algorithms on your photos. 
                  Your personalized routines are synthesized transparently from your self-reported questionnaire responses. 
                  This photo serves strictly as a private visual reference for your personal reflection journal.
                </p>
              </div>
            </div>
          ) : (
            /* Empty State / Upload Zone */
            <div className="photo-dropzone">
              <div className="dropzone-icon-circle">
                <Upload size={32} className="text-lavender" />
              </div>
              <h3 className="dropzone-title">Upload a bare-face photo (Optional)</h3>
              <p className="dropzone-desc">
                Supports JPG, PNG, or WebP. Take photo in diffuse natural morning light for best personal comparison.
              </p>

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                id="select-photo-btn"
              >
                <Camera size={18} />
                <span>{isProcessing ? 'Processing in Browser...' : 'Select Photo from Device'}</span>
              </button>

              <span className="dropzone-subtext">
                Completely optional. You can continue without a photo at any time.
              </span>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            id="hidden-photo-input"
          />

          {errorMessage && (
            <div className="photo-error-banner animate-fade-in" role="alert">
              <AlertTriangle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Lighting & Photography Tips */}
        <div className="photography-tips-grid">
          <div className="tip-card card">
            <h4 className="tip-title font-serif">Gentle Lighting Tips</h4>
            <p className="tip-text">
              Stand facing an indirect natural window. Avoid harsh direct overhead spotlights or yellow bathroom bulbs which exaggerate skin shadowing.
            </p>
          </div>

          <div className="tip-card card">
            <h4 className="tip-title font-serif">Bare Skin Best Practice</h4>
            <p className="tip-text">
              Wait 15-20 minutes after cleansing before snapping your visual reference so temporary flushing from water temperature has dissipated.
            </p>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="photo-nav-row">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigateTo('questionnaire')}
          >
            <span>Back to Questionnaire</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleProceed}
            id="proceed-to-dashboard-btn"
          >
            <span>{profile.photo ? 'Save & View Skin Dashboard' : 'Skip & View Dashboard'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Local Photo Preview (100% Private)"
      >
        <div className="modal-photo-preview text-center">
          <img 
            src={profile.photo} 
            alt="Full-size local preview" 
            className="modal-preview-img"
          />
          <p className="modal-photo-caption">
            Saved securely in your browser's local sandbox memory.
          </p>
        </div>
      </Modal>
    </div>
  );
};
