import React, { useState, useRef } from 'react';
import { 
  Search, ChevronDown, ChevronRight, CheckCircle, Circle, 
  FileText, Play, Download, Printer, AlertCircle, Lightbulb,
  Clock, User, HelpCircle, BookOpen, ClipboardList, Video,
  MessageSquare, Star, ChevronLeft, X
} from 'lucide-react';
import { examPrepData, generalExamTips, examChecklist, dbqVideos, ExamPrep } from '@/data/cpExamData';
import { conditions } from '@/data/conditions';

interface CPExamPrepProps {
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const CPExamPrep: React.FC<CPExamPrepProps> = ({ 
  setCurrentPage, 
  isLoggedIn,
  setShowAuthModal,
  setAuthMode 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'conditions' | 'questions' | 'checklist' | 'videos'>('overview');
  const [selectedExamType, setSelectedExamType] = useState<ExamPrep | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['what-to-expect']);
  const [checklistItems, setChecklistItems] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleChecklistItem = (item: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const getCompletedCount = (category: string) => {
    const categoryItems = examChecklist.find(c => c.category === category)?.items || [];
    return categoryItems.filter(item => checklistItems[item]).length;
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredExamTypes = examPrepData.filter(exam =>
    exam.conditionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.conditionIds.some(id => {
      const condition = conditions.find(c => c.id === id);
      return condition?.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'conditions', label: 'By Condition', icon: ClipboardList },
    { id: 'questions', label: 'Common Questions', icon: MessageSquare },
    { id: 'checklist', label: 'Exam Checklist', icon: CheckCircle },
    { id: 'videos', label: 'DBQ Videos', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-amber-400" />
            Critical Step in Your Claim
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">C&P Exam Preparation</h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            The Compensation & Pension exam is the most important step in your claim. Proper preparation can mean the difference between approval and denial. Learn what to expect and how to present your case effectively.
          </p>
          
          {/* Hero Image */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg"
              alt="Medical examination"
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-navy-900'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* What is a C&P Exam */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a C&P Exam?</h2>
              <p className="text-gray-600 mb-6">
                A Compensation and Pension (C&P) exam is a medical examination conducted by a VA healthcare provider or VA-contracted examiner. The purpose is to evaluate the current severity of your claimed conditions and determine if they are connected to your military service.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-amber-50 rounded-xl p-5">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-sm text-gray-600">Exams typically last 20-90 minutes depending on the condition being evaluated.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Examiner</h3>
                  <p className="text-sm text-gray-600">A medical professional qualified to evaluate your specific condition type.</p>
                </div>
                <div className="bg-green-50 rounded-xl p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">DBQ Form</h3>
                  <p className="text-sm text-gray-600">Results are recorded on a Disability Benefits Questionnaire specific to your condition.</p>
                </div>
              </div>
            </div>

            {/* General Tips */}
            <div className="grid md:grid-cols-3 gap-6">
              {generalExamTips.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-5 bg-navy-900 text-white">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Critical: Don't Miss Your Exam!</h3>
                  <p className="text-red-800">
                    Missing a C&P exam without rescheduling can result in your claim being denied. If you cannot attend, contact the VA immediately to reschedule. The exam is your opportunity to show the examiner the true impact of your conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Prepare for Your Exam?</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Select your condition type to get specific preparation guidance, common questions, and tips for your C&P exam.
              </p>
              <button
                onClick={() => setActiveTab('conditions')}
                className="px-8 py-3 bg-amber-500 text-navy-900 rounded-xl font-bold hover:bg-amber-400 transition-colors"
              >
                Find Your Condition
              </button>
            </div>
          </div>
        )}

        {/* Conditions Tab */}
        {activeTab === 'conditions' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by condition type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Condition Type List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Exam Types</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredExamTypes.map((exam) => (
                      <button
                        key={exam.conditionType}
                        onClick={() => setSelectedExamType(exam)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedExamType?.conditionType === exam.conditionType 
                            ? 'bg-amber-50 border-l-4 border-amber-500' 
                            : ''
                        }`}
                      >
                        <h4 className="font-medium text-gray-900">{exam.conditionType}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {exam.examDuration} • {exam.examinerType}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condition Details */}
              <div className="lg:col-span-2">
                {selectedExamType ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                      <h2 className="text-xl font-bold mb-2">{selectedExamType.conditionType}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedExamType.examDuration}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {selectedExamType.examinerType}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Sections */}
                    <div className="divide-y divide-gray-200">
                      {/* What to Expect */}
                      <div>
                        <button
                          onClick={() => toggleSection('what-to-expect')}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <HelpCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900">What to Expect</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedSections.includes('what-to-expect') ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedSections.includes('what-to-expect') && (
                          <div className="px-4 pb-4">
                            <ul className="space-y-2">
                              {selectedExamType.whatToExpect.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Common Questions */}
                      <div>
                        <button
                          onClick={() => toggleSection('questions')}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Common Questions & How to Answer</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedSections.includes('questions') ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedSections.includes('questions') && (
                          <div className="px-4 pb-4 space-y-4">
                            {selectedExamType.commonQuestions.map((q, i) => (
                              <div key={i} className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">"{q.question}"</h4>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-3">
                                  <p className="text-sm text-amber-800">
                                    <strong>Tip:</strong> {q.tip}
                                  </p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-3">
                                  <p className="text-sm text-gray-600">
                                    <strong>Example Answer:</strong> "{q.exampleAnswer}"
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Worst Day Tips */}
                      <div>
                        <button
                          onClick={() => toggleSection('worst-day')}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Documenting Your Worst Days</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedSections.includes('worst-day') ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedSections.includes('worst-day') && (
                          <div className="px-4 pb-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                              <p className="text-sm text-red-800">
                                <strong>Important:</strong> The VA rates your condition based on how it affects you at its worst, not on your best days. Be sure to describe your worst symptoms clearly.
                              </p>
                            </div>
                            <ul className="space-y-2">
                              {selectedExamType.worstDayTips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                  <Lightbulb className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Documents to Bring */}
                      <div>
                        <button
                          onClick={() => toggleSection('documents')}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Documents to Bring</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedSections.includes('documents') ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedSections.includes('documents') && (
                          <div className="px-4 pb-4">
                            <ul className="space-y-2">
                              {selectedExamType.documentsTooBring.map((doc, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* DBQ Information */}
                      <div>
                        <button
                          onClick={() => toggleSection('dbq')}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                              <ClipboardList className="w-5 h-5 text-navy-600" />
                            </div>
                            <span className="font-semibold text-gray-900">DBQ Form & Rating Criteria</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedSections.includes('dbq') ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {expandedSections.includes('dbq') && (
                          <div className="px-4 pb-4">
                            <div className="bg-navy-50 rounded-lg p-4 mb-4">
                              <h4 className="font-semibold text-navy-900 mb-1">{selectedExamType.dbqInfo.formNumber}</h4>
                              <p className="text-sm text-navy-700">{selectedExamType.dbqInfo.formName}</p>
                            </div>
                            
                            <h5 className="font-medium text-gray-900 mb-2">Key Measurements</h5>
                            <ul className="space-y-1 mb-4">
                              {selectedExamType.dbqInfo.keyMeasurements.map((m, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-navy-500">•</span>
                                  {m}
                                </li>
                              ))}
                            </ul>

                            <h5 className="font-medium text-gray-900 mb-2">Rating Criteria</h5>
                            <ul className="space-y-1">
                              {selectedExamType.dbqInfo.ratingCriteria.map((r, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-amber-500">•</span>
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Condition Type</h3>
                    <p className="text-gray-500">
                      Choose an exam type from the list to see specific preparation guidance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">How to Answer Examiner Questions</h3>
                  <p className="text-amber-800">
                    Be honest, specific, and thorough. Don't minimize your symptoms, but don't exaggerate either. Use concrete examples and describe how your condition affects your daily life.
                  </p>
                </div>
              </div>
            </div>

            {examPrepData.map((exam) => (
              <div key={exam.conditionType} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-navy-900 text-white">
                  <h3 className="font-semibold">{exam.conditionType}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {exam.commonQuestions.map((q, i) => (
                    <div key={i} className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">"{q.question}"</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-amber-50 rounded-lg p-3">
                          <h5 className="text-xs font-semibold text-amber-800 uppercase mb-1">Tip</h5>
                          <p className="text-sm text-amber-900">{q.tip}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">Example Answer</h5>
                          <p className="text-sm text-gray-700">"{q.exampleAnswer}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Printable Exam Checklist</h2>
                <p className="text-gray-600">Check off items as you prepare for your C&P exam.</p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Checklist
              </button>
            </div>

            <div ref={printRef} className="space-y-6 print:space-y-4">
              {/* Print Header - only shows when printing */}
              <div className="hidden print:block text-center mb-8">
                <h1 className="text-2xl font-bold">C&P Exam Preparation Checklist</h1>
                <p className="text-gray-600">VetClaims Pro - www.vetclaimspro.com</p>
              </div>

              {examChecklist.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:shadow-none print:border">
                  <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                    <span className="text-sm text-gray-500 print:hidden">
                      {getCompletedCount(category.category)}/{category.items.length} completed
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <label
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            checklistItems[item] ? 'bg-green-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checklistItems[item] || false}
                            onChange={() => toggleChecklistItem(item)}
                            className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 mt-0.5"
                          />
                          <span className={`${checklistItems[item] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Notes Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print:shadow-none print:border">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notes</h3>
                </div>
                <div className="p-4">
                  <textarea
                    placeholder="Write any additional notes or questions for your exam..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 print:border-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">DBQ Video Tutorials</h2>
              <p className="text-gray-600">
                Learn how examiners use Disability Benefits Questionnaires (DBQs) to evaluate your conditions and determine your rating.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbqVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-navy-900 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {video.topics.slice(0, 2).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {topic}
                        </span>
                      ))}
                      {video.topics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{video.topics.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    {isLoggedIn ? (
                      <button className="w-full py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Watch Video
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                        }}
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Sign Up to Watch
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isLoggedIn && (
              <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-8 text-white text-center">
                <Video className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <h3 className="text-xl font-bold mb-2">Unlock All Video Tutorials</h3>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Create a free account to access our complete library of DBQ video tutorials and exam preparation guides.
                </p>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="px-8 py-3 bg-amber-500 text-navy-900 rounded-xl font-bold hover:bg-amber-400 transition-colors"
                >
                  Create Free Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #root {
            visibility: visible;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          button, nav, header, footer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CPExamPrep;
