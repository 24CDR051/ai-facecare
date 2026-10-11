import React, { useState } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { Modal } from '../Modal';
import { 
  Sun, 
  Moon, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle, 
  Check, 
  Info, 
  ShieldAlert, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const RoutinesScreen = () => {
  const { 
    routine, 
    trackerData, 
    toggleTrackerStep, 
    addCustomRoutineStep, 
    removeRoutineStep,
    navigateTo 
  } = useSkinCare();

  const [activeTab, setActiveTab] = useState('am'); // 'am' or 'pm'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStepData, setNewStepData] = useState({
    title: '',
    category: 'Treat',
    duration: '60 sec',
    productType: '',
    why: '',
    instructions: ''
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const todayProgress = trackerData[todayStr] || { amCompleted: [], pmCompleted: [] };
  const currentSteps = activeTab === 'am' ? (routine.amRoutine || []) : (routine.pmRoutine || []);
  const completedList = activeTab === 'am' ? todayProgress.amCompleted : todayProgress.pmCompleted;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStepData.title.trim()) return;

    addCustomRoutineStep(activeTab, newStepData);
    setNewStepData({
      title: '',
      category: 'Treat',
      duration: '60 sec',
      productType: '',
      why: '',
      instructions: ''
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="routines-screen animate-fade-in">
      <div className="routines-header">
        <div>
          <div className="badge badge-lavender">
            <Sparkles size={14} />
            <span>Step-by-Step Regimen</span>
          </div>
          <h1 className="routines-title">Morning & Evening Skincare Guide</h1>
          <p className="routines-subtitle">
            Curated application order, essential active ingredients, and clinical layering tips for optimal barrier defense.
          </p>
        </div>

        <div className="routines-header-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsAddModalOpen(true)}
            id="add-custom-step-btn"
          >
            <Plus size={16} />
            <span>Add Custom Step to {activeTab.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* AM / PM Tabs */}
      <div className="routines-tab-switch-row">
        <button
          type="button"
          className={`routine-tab-btn ${activeTab === 'am' ? 'active' : ''}`}
          onClick={() => setActiveTab('am')}
          id="tab-am-btn"
        >
          <Sun size={20} className="tab-icon text-amber" />
          <div className="tab-label-col">
            <span className="tab-title">Morning (AM) Regimen</span>
            <span className="tab-sub">Protect • Hydrate • Shield</span>
          </div>
        </button>

        <button
          type="button"
          className={`routine-tab-btn ${activeTab === 'pm' ? 'active' : ''}`}
          onClick={() => setActiveTab('pm')}
          id="tab-pm-btn"
        >
          <Moon size={20} className="tab-icon text-lavender" />
          <div className="tab-label-col">
            <span className="tab-title">Evening (PM) Regimen</span>
            <span className="tab-sub">Deep Cleanse • Repair • Seal</span>
          </div>
        </button>
      </div>

      {/* Routine Steps List */}
      <div className="routine-steps-container">
        {currentSteps.map((step, index) => {
          const isDoneToday = completedList.includes(step.id);
          return (
            <div 
              key={step.id || index} 
              className={`routine-step-card card ${isDoneToday ? 'completed-card' : ''}`}
            >
              <div className="step-card-main">
                {/* Step Number Circle */}
                <div className={`step-order-indicator ${isDoneToday ? 'done' : ''}`}>
                  {isDoneToday ? <Check size={20} /> : <span>{index + 1}</span>}
                </div>

                {/* Step Details */}
                <div className="step-content-body">
                  <div className="step-badge-row">
                    <span className="badge badge-lavender">{step.category}</span>
                    <span className="step-duration-chip">
                      <Clock size={13} /> {step.duration || '60 sec'}
                    </span>
                    {step.isCustom && <span className="badge badge-sage">Custom Added</span>}
                  </div>

                  <h3 className="step-card-title">{step.title}</h3>

                  {step.productType && (
                    <div className="step-product-type">
                      <strong>Recommended Formulation:</strong> {step.productType}
                    </div>
                  )}

                  <div className="step-why-box">
                    <div className="why-label">
                      <Info size={14} className="text-lavender" />
                      <span>Why your skin barrier needs this:</span>
                    </div>
                    <p className="why-text">{step.why}</p>
                  </div>

                  <div className="step-instructions-box">
                    <strong>How to apply:</strong>
                    <p>{step.instructions}</p>
                  </div>
                </div>

                {/* Step Actions: Toggle Today or Remove */}
                <div className="step-side-actions">
                  <button
                    type="button"
                    className={`btn btn-sm ${isDoneToday ? 'btn-sage' : 'btn-outline'}`}
                    onClick={() => toggleTrackerStep(todayStr, activeTab, step.id)}
                    title={isDoneToday ? 'Mark as incomplete' : 'Mark as done today'}
                  >
                    <CheckCircle size={15} />
                    <span>{isDoneToday ? 'Done Today' : 'Mark Done'}</span>
                  </button>

                  {step.isCustom && (
                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => removeRoutineStep(activeTab, step.id)}
                      title="Remove custom step"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Education Banner */}
      <div className="routine-tips-card card">
        <div className="tip-header-row">
          <Sparkles size={20} className="text-lavender" />
          <h4 className="tip-card-title">Golden Rules of Layering: Thin to Thick</h4>
        </div>
        <p className="tip-card-body">
          Always apply products from thinnest water consistency (mists, essences, serums) 
          to thicker emulsions (lotions, creams), ending with oils or sunscreens. 
          This allows light active molecules to penetrate before occlusives lock in the seal.
        </p>
      </div>

      {/* Add Custom Step Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add Custom Step to ${activeTab.toUpperCase()} Routine`}
      >
        <form onSubmit={handleAddSubmit} className="add-step-form">
          <div className="form-group">
            <label className="form-label" htmlFor="custom-step-name">Step Name / Product</label>
            <input
              id="custom-step-name"
              type="text"
              required
              className="form-input"
              placeholder="e.g. Soothing Sheet Mask or Squalane Facial Oil"
              value={newStepData.title}
              onChange={(e) => setNewStepData({ ...newStepData, title: e.target.value })}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="custom-step-cat">Category</label>
              <select
                id="custom-step-cat"
                className="form-select"
                value={newStepData.category}
                onChange={(e) => setNewStepData({ ...newStepData, category: e.target.value })}
              >
                <option value="Cleanse">Cleanse</option>
                <option value="Tone & Prep">Tone & Prep</option>
                <option value="Treat">Treat / Serum</option>
                <option value="Moisturize">Moisturize</option>
                <option value="Eye Care">Eye Care</option>
                <option value="Protect">Protect (SPF)</option>
                <option value="Weekly Treatment">Weekly Mask</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="custom-step-dur">Duration</label>
              <input
                id="custom-step-dur"
                type="text"
                className="form-input"
                placeholder="e.g. 60 sec or 10 min"
                value={newStepData.duration}
                onChange={(e) => setNewStepData({ ...newStepData, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="custom-step-why">Why you use it (Notes)</label>
            <textarea
              id="custom-step-why"
              rows={2}
              className="form-textarea"
              placeholder="e.g. Extra soothing after outdoor running..."
              value={newStepData.why}
              onChange={(e) => setNewStepData({ ...newStepData, why: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="custom-step-inst">How to Apply</label>
            <textarea
              id="custom-step-inst"
              rows={2}
              className="form-textarea"
              placeholder="e.g. Press 3 drops onto clean skin before moisturizer..."
              value={newStepData.instructions}
              onChange={(e) => setNewStepData({ ...newStepData, instructions: e.target.value })}
            />
          </div>

          <div className="modal-actions-row">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Custom Step
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
