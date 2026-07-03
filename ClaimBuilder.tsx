import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, AlertCircle, FileText, Upload, Calculator, Lightbulb, Plus, X, Search } from 'lucide-react';
import { conditions, ratingCalculator, Condition } from '@/data/conditions';

interface ClaimBuilderProps {
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

interface ClaimCondition {
  condition: Condition;
  claimType: 'direct' | 'secondary' | 'aggravation';
  primaryCondition?: string;
  estimatedRating: number;
}

const ClaimBuilder: React.FC<ClaimBuilderProps> = ({ setShowAuthModal, setAuthMode, isLoggedIn }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceInfo, setServiceInfo] = useState({
    branch: '',
    startDate: '',
    endDate: '',
    mos: '',
    deployments: '',
    combatService: false,
  });
  const [selectedConditions, setSelectedConditions] = useState<ClaimCondition[]>([]);
  const [conditionSearch, setConditionSearch] = useState('');
  const [showConditionPicker, setShowConditionPicker] = useState(false);
  const [evidenceChecklist, setEvidenceChecklist] = useState<{[key: string]: boolean}>({});

  const steps = [
    { id: 1, name: 'Service Info', description: 'Your military service details' },
    { id: 2, name: 'Conditions', description: 'Select conditions to claim' },
    { id: 3, name: 'Evidence', description: 'Gather required evidence' },
    { id: 4, name: 'Review', description: 'Review and submit' },
  ];

  const branches = ['Army', 'Navy', 'Air Force', 'Marine Corps', 'Coast Guard', 'Space Force'];

  const filteredConditions = conditions.filter(c => 
    c.name.toLowerCase().includes(conditionSearch.toLowerCase()) ||
    c.keywords.some(k => k.toLowerCase().includes(conditionSearch.toLowerCase()))
  );

  const addCondition = (condition: Condition) => {
    if (!selectedConditions.find(sc => sc.condition.id === condition.id)) {
      setSelectedConditions([...selectedConditions, {
        condition,
        claimType: 'direct',
        estimatedRating: condition.commonRatings[Math.floor(condition.commonRatings.length / 2)] || 10,
      }]);
    }
    setShowConditionPicker(false);
    setConditionSearch('');
  };

  const removeCondition = (conditionId: string) => {
    setSelectedConditions(selectedConditions.filter(sc => sc.condition.id !== conditionId));
  };

  const updateCondition = (conditionId: string, updates: Partial<ClaimCondition>) => {
    setSelectedConditions(selectedConditions.map(sc => 
      sc.condition.id === conditionId ? { ...sc, ...updates } : sc
    ));
  };

  const calculateCombinedRating = () => {
    const ratings = selectedConditions.map(sc => sc.estimatedRating);
    return ratingCalculator.combineRatings(ratings);
  };

  const getAllRequiredEvidence = () => {
    const evidenceSet = new Set<string>();
    selectedConditions.forEach(sc => {
      sc.condition.requiredEvidence.forEach(e => evidenceSet.add(e));
    });
    return Array.from(evidenceSet);
  };

  const toggleEvidence = (evidence: string) => {
    setEvidenceChecklist(prev => ({
      ...prev,
      [evidence]: !prev[evidence]
    }));
  };

  const getCompletedEvidenceCount = () => {
    return Object.values(evidenceChecklist).filter(Boolean).length;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Military Service Information</h3>
              <p className="text-gray-600 mb-6">This information helps us recommend the right forms and evidence for your claim.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch of Service</label>
                <select
                  value={serviceInfo.branch}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, branch: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MOS/Rate/AFSC</label>
                <input
                  type="text"
                  value={serviceInfo.mos}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, mos: e.target.value })}
                  placeholder="e.g., 11B, HM, 2A5X1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Start Date</label>
                <input
                  type="date"
                  value={serviceInfo.startDate}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service End Date</label>
                <input
                  type="date"
                  value={serviceInfo.endDate}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deployments (Optional)</label>
                <textarea
                  value={serviceInfo.deployments}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, deployments: e.target.value })}
                  placeholder="List any deployments with dates and locations..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceInfo.combatService}
                    onChange={(e) => setServiceInfo({ ...serviceInfo, combatService: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-gray-700">I served in a combat zone or received hostile fire pay</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Conditions to Claim</h3>
              <p className="text-gray-600 mb-6">Add all conditions you want to claim. You can claim them as direct service connection, secondary to another condition, or aggravation of a pre-existing condition.</p>
            </div>

            {/* Add Condition Button */}
            <button
              onClick={() => setShowConditionPicker(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add a Condition
            </button>

            {/* Condition Picker Modal */}
            {showConditionPicker && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Select a Condition</h3>
                    <button onClick={() => setShowConditionPicker(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search conditions..."
                        value={conditionSearch}
                        onChange={(e) => setConditionSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-[50vh]">
                    {filteredConditions.map(condition => (
                      <button
                        key={condition.id}
                        onClick={() => addCondition(condition)}
                        disabled={selectedConditions.some(sc => sc.condition.id === condition.id)}
                        className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                          selectedConditions.some(sc => sc.condition.id === condition.id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900">{condition.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{condition.category.replace('-', ' ')}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Selected Conditions */}
            {selectedConditions.length > 0 && (
              <div className="space-y-4">
                {selectedConditions.map((sc, index) => (
                  <div key={sc.condition.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{sc.condition.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{sc.condition.category.replace('-', ' ')}</p>
                      </div>
                      <button
                        onClick={() => removeCondition(sc.condition.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Claim Type</label>
                        <select
                          value={sc.claimType}
                          onChange={(e) => updateCondition(sc.condition.id, { claimType: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                        >
                          <option value="direct">Direct Service Connection</option>
                          <option value="secondary">Secondary to Another Condition</option>
                          <option value="aggravation">Aggravation of Pre-Existing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Rating</label>
                        <select
                          value={sc.estimatedRating}
                          onChange={(e) => updateCondition(sc.condition.id, { estimatedRating: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                        >
                          {sc.condition.commonRatings.map(rating => (
                            <option key={rating} value={rating}>{rating}%</option>
                          ))}
                        </select>
                      </div>

                      {sc.claimType === 'secondary' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Condition</label>
                          <input
                            type="text"
                            value={sc.primaryCondition || ''}
                            onChange={(e) => updateCondition(sc.condition.id, { primaryCondition: e.target.value })}
                            placeholder="Enter the primary condition this is secondary to..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Rating Calculator */}
                <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-amber-400" />
                    <h4 className="font-semibold">Estimated Combined Rating</h4>
                  </div>
                  <div className="text-5xl font-bold text-amber-400 mb-2">{calculateCombinedRating()}%</div>
                  <p className="text-sm text-gray-300">
                    Based on VA combined ratings table. Actual rating may vary based on C&P exam results.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        const allEvidence = getAllRequiredEvidence();
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Evidence Checklist</h3>
              <p className="text-gray-600 mb-6">
                Gather the following evidence to support your claim. Check off items as you collect them.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    <strong>Pro Tip:</strong> The more evidence you provide, the stronger your claim. Consider getting buddy statements from fellow service members and nexus letters from your doctors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-900">Evidence Progress</span>
                <span className="text-sm text-gray-600">
                  {getCompletedEvidenceCount()} of {allEvidence.length} items
                </span>
              </div>
              <div className="p-4">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(getCompletedEvidenceCount() / allEvidence.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {allEvidence.map((evidence, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        evidenceChecklist[evidence] ? 'bg-green-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={evidenceChecklist[evidence] || false}
                        onChange={() => toggleEvidence(evidence)}
                        className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 mt-0.5"
                      />
                      <span className={`${evidenceChecklist[evidence] ? 'text-green-700' : 'text-gray-700'}`}>
                        {evidence}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-6 h-6 text-navy-600" />
                <h4 className="font-semibold text-gray-900">Upload Documents</h4>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500">Supports PDF, JPG, PNG (Max 10MB per file)</p>
                {!isLoggedIn && (
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="mt-4 px-6 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                  >
                    Sign Up to Upload Documents
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Claim</h3>
              <p className="text-gray-600 mb-6">Review all information before proceeding to file your claim.</p>
            </div>

            {/* Service Info Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Service Information</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Branch:</span>
                  <span className="ml-2 text-gray-900">{serviceInfo.branch || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-500">MOS/Rate:</span>
                  <span className="ml-2 text-gray-900">{serviceInfo.mos || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Service Dates:</span>
                  <span className="ml-2 text-gray-900">
                    {serviceInfo.startDate && serviceInfo.endDate 
                      ? `${serviceInfo.startDate} to ${serviceInfo.endDate}`
                      : 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Combat Service:</span>
                  <span className="ml-2 text-gray-900">{serviceInfo.combatService ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Conditions Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Conditions ({selectedConditions.length})</h4>
              <div className="space-y-3">
                {selectedConditions.map(sc => (
                  <div key={sc.condition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{sc.condition.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{sc.claimType.replace('-', ' ')}</div>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold">
                      {sc.estimatedRating}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Estimated Combined Rating:</span>
                <span className="text-2xl font-bold text-amber-600">{calculateCombinedRating()}%</span>
              </div>
            </div>

            {/* Evidence Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Evidence Status</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${(getCompletedEvidenceCount() / getAllRequiredEvidence().length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {getCompletedEvidenceCount()}/{getAllRequiredEvidence().length} items collected
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-4">Next Steps</h4>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-navy-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Download and complete VA Form 21-526EZ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-navy-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Gather all evidence from your checklist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-navy-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Submit your claim online at VA.gov or by mail</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-navy-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Attend your C&P exam when scheduled</span>
                </li>
              </ol>
            </div>

            {!isLoggedIn && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-amber-900 mb-2">Save Your Progress</h4>
                <p className="text-amber-800 mb-4">Create an account to save your claim progress and access it anytime.</p>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="px-6 py-3 bg-amber-500 text-navy-900 rounded-lg font-bold hover:bg-amber-400 transition-colors"
                >
                  Create Free Account
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Claim Builder</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Build your disability claim step-by-step. We'll guide you through selecting conditions, gathering evidence, and preparing for success.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                      currentStep >= step.id
                        ? 'bg-amber-500 text-navy-900'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </button>
                  <span className={`mt-2 text-xs font-medium hidden sm:block ${
                    currentStep >= step.id ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.id ? 'bg-amber-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-navy-900 rounded-lg font-bold hover:bg-amber-400 transition-colors"
            >
              Next Step
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <a
              href="https://www.va.gov/disability/file-disability-claim-form-21-526ez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition-colors"
            >
              File on VA.gov
              <FileText className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimBuilder;
