import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, ChevronDown, AlertCircle, CheckCircle, FileText, Lightbulb, X } from 'lucide-react';
import { conditions, conditionCategories, Condition } from '@/data/conditions';

interface ConditionsLibraryProps {
  setCurrentPage: (page: string) => void;
}

const ConditionsLibrary: React.FC<ConditionsLibraryProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['symptoms', 'evidence', 'tips']);

  const filteredConditions = useMemo(() => {
    return conditions.filter(condition => {
      const matchesSearch = searchQuery === '' || 
        condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || condition.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'musculoskeletal': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      'mental-health': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'respiratory': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'cardiovascular': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      'neurological': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'hearing': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
    };
    return icons[categoryId] || <FileText className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Conditions Library</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Research service-connected conditions, understand rating criteria, and learn what evidence you need for a successful claim.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conditions by name, symptoms, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  !selectedCategory 
                    ? 'bg-amber-500 text-navy-900' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {conditionCategories.slice(0, 5).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-amber-500 text-navy-900' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conditions List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900">
                  {filteredConditions.length} Conditions Found
                </h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {filteredConditions.map(condition => (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedCondition(condition)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedCondition?.id === condition.id ? 'bg-amber-50 border-l-4 border-amber-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{condition.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{condition.category.replace('-', ' ')}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="mt-2 flex gap-1">
                      {condition.commonRatings.slice(0, 3).map(rating => (
                        <span key={rating} className="px-2 py-0.5 bg-navy-100 text-navy-700 text-xs rounded-full">
                          {rating}%
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Condition Details */}
          <div className="lg:col-span-2">
            {selectedCondition ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Condition Header */}
                <div className="p-6 bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3 capitalize">
                        {selectedCondition.category.replace('-', ' ')}
                      </span>
                      <h2 className="text-2xl font-bold mb-2">{selectedCondition.name}</h2>
                      <p className="text-gray-300">{selectedCondition.description}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedCondition(null)}
                      className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-gray-300">Common Ratings:</span>
                    {selectedCondition.commonRatings.map(rating => (
                      <span key={rating} className="px-3 py-1 bg-amber-500 text-navy-900 font-bold rounded-full text-sm">
                        {rating}%
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Sections */}
                <div className="divide-y divide-gray-200">
                  {/* Symptoms */}
                  <div>
                    <button
                      onClick={() => toggleSection('symptoms')}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="font-semibold text-gray-900">Symptoms</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('symptoms') ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.includes('symptoms') && (
                      <div className="px-4 pb-4">
                        <ul className="grid md:grid-cols-2 gap-2">
                          {selectedCondition.symptoms.map((symptom, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Required Evidence */}
                  <div>
                    <button
                      onClick={() => toggleSection('evidence')}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-900">Required Evidence</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('evidence') ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.includes('evidence') && (
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {selectedCondition.requiredEvidence.map((evidence, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 p-3 bg-blue-50 rounded-lg">
                              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {i + 1}
                              </span>
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Success Tips */}
                  <div>
                    <button
                      onClick={() => toggleSection('tips')}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="font-semibold text-gray-900">Success Tips</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('tips') ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections.includes('tips') && (
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {selectedCondition.successTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 p-3 bg-amber-50 rounded-lg">
                              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Related Conditions */}
                  {selectedCondition.relatedConditions.length > 0 && (
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Related Conditions (Secondary Claims)</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCondition.relatedConditions.map(relatedId => {
                          const related = conditions.find(c => c.id === relatedId);
                          return related ? (
                            <button
                              key={relatedId}
                              onClick={() => setSelectedCondition(related)}
                              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                            >
                              {related.name}
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage('claim-builder')}
                    className="w-full py-3 bg-amber-500 text-navy-900 rounded-lg font-bold hover:bg-amber-400 transition-colors"
                  >
                    Start Claim for This Condition
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Condition</h3>
                <p className="text-gray-500">
                  Choose a condition from the list to view detailed information about symptoms, required evidence, and success tips.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsLibrary;
