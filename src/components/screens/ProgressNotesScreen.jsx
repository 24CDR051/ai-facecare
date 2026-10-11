import React, { useState, useRef } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { compressImageClientSide } from '../../utils/imageUtils';
import { Modal } from '../Modal';
import { 
  BookHeart, 
  Calendar, 
  Camera, 
  Trash2, 
  Plus, 
  Smile, 
  Tag, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Heart,
  AlertCircle
} from 'lucide-react';

export const ProgressNotesScreen = () => {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useSkinCare();
  const fileInputRef = useRef(null);

  // New Note State
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState(['Hydrated Well', 'Wore Daily SPF']);
  const [notes, setNotes] = useState('');
  const [notePhoto, setNotePhoto] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [modalPhotoSrc, setModalPhotoSrc] = useState(null);

  const availableTags = [
    'Hydrated Well',
    'Wore Daily SPF',
    '7+ Hours Sleep',
    'Calm & Glowy',
    'Slight Redness',
    'Dry / Flaky Flurry',
    'Mild Breakout',
    'Stressful Day',
    'New Product Trial'
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await compressImageClientSide(file, 450, 450, 0.8);
      setNotePhoto(result.dataUrl);
    } catch (err) {
      alert(err.message || 'Error processing photo locally.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim() && selectedTags.length === 0 && !notePhoto) {
      alert('Please write a quick note, choose a tag, or upload a photo.');
      return;
    }

    addJournalEntry({
      date,
      rating,
      tags: selectedTags,
      notes: notes.trim(),
      photo: notePhoto
    });

    // Reset draft
    setNotes('');
    setNotePhoto(null);
    setSelectedTags(['Hydrated Well']);
  };

  const ratingLabels = {
    1: 'Tight / Irritated',
    2: 'Dry / Sensitive',
    3: 'Balanced',
    4: 'Smooth & Calm',
    5: 'Radiant Glow'
  };

  return (
    <div className="progress-screen animate-fade-in">
      <div className="progress-header">
        <div>
          <div className="badge badge-lavender">
            <BookHeart size={14} />
            <span>Mindful Journaling</span>
          </div>
          <h1 className="progress-title">Skin Progress & Reflection Journal</h1>
          <p className="progress-subtitle">
            Document changes in your skin, log lifestyle factors, and keep an offline visual progression timeline.
          </p>
        </div>
      </div>

      <div className="progress-layout-grid">
        {/* Left Column: Create New Journal Entry */}
        <div className="journal-form-card card">
          <div className="form-card-header">
            <h3 className="form-card-title font-serif">Log Today's Reflection</h3>
            <span className="badge badge-sage">100% Private Offline</span>
          </div>

          <form onSubmit={handleSubmit} className="journal-entry-form">
            {/* Date and Rating Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="journal-date">Entry Date</label>
                <input
                  id="journal-date"
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Skin Feel: <strong>{ratingLabels[rating]} ({rating}/5)</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="form-range"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Quick Habit Tags */}
            <div className="form-group">
              <label className="form-label">Lifestyle & Skin Tags</label>
              <div className="tags-selector-row">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      className={`journal-tag-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="journal-notes">Reflections & Notes</label>
              <textarea
                id="journal-notes"
                rows={3}
                className="form-textarea"
                placeholder="How did your skin feel today? Any reactions to weather or new products?..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Optional Attached Photo */}
            <div className="form-group">
              <label className="form-label">Optional Photo Reference (Client-only)</label>
              {notePhoto ? (
                <div className="attached-photo-preview">
                  <img src={notePhoto} alt="Journal snapshot preview" className="attached-thumbnail" />
                  <div className="attached-photo-actions">
                    <span className="badge badge-sage">Attached Locally</span>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setNotePhoto(null)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-mini-box">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isCompressing}
                  >
                    <Camera size={16} />
                    <span>{isCompressing ? 'Compressing locally...' : 'Attach Today\'s Photo'}</span>
                  </button>
                  <span className="upload-mini-hint">Never sent to any cloud server</span>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              id="save-journal-entry-btn"
            >
              <Plus size={16} />
              <span>Save Progress Note</span>
            </button>
          </form>
        </div>

        {/* Right Column: Timeline History */}
        <div className="journal-timeline-column">
          <h3 className="timeline-title font-serif">Past Reflections ({journalEntries.length})</h3>

          {journalEntries.length === 0 ? (
            <div className="card empty-timeline text-center">
              <p>No journal entries recorded yet. Log your first skin reflection on the left!</p>
            </div>
          ) : (
            <div className="timeline-cards-list">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="timeline-card card animate-fade-in">
                  <div className="timeline-card-header">
                    <div className="date-badge-col">
                      <Calendar size={15} className="text-lavender" />
                      <strong>{entry.date}</strong>
                    </div>

                    <div className="rating-pill badge badge-lavender">
                      <span>Feel: {ratingLabels[entry.rating] || `${entry.rating}/5`}</span>
                    </div>

                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => deleteJournalEntry(entry.id)}
                      title="Delete journal entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {entry.tags?.length > 0 && (
                    <div className="entry-tags-row">
                      {entry.tags.map((t, tIdx) => (
                        <span key={tIdx} className="entry-tag-pill">{t}</span>
                      ))}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="entry-notes-body">{entry.notes}</p>
                  )}

                  {entry.photo && (
                    <div className="entry-photo-wrapper">
                      <img 
                        src={entry.photo} 
                        alt="Journal photo reference" 
                        className="entry-thumbnail-img"
                        onClick={() => {
                          setModalPhotoSrc(entry.photo);
                          setIsPhotoModalOpen(true);
                        }}
                        title="Click to enlarge"
                      />
                      <span className="photo-client-tag">Private Local Reference</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Journal Photo Modal */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Journal Photo Reference"
      >
        <div className="modal-photo-preview text-center">
          {modalPhotoSrc && (
            <img src={modalPhotoSrc} alt="Enlarged Journal Reference" className="modal-preview-img" />
          )}
          <p className="modal-photo-caption">Stored locally on your device.</p>
        </div>
      </Modal>
    </div>
  );
};
