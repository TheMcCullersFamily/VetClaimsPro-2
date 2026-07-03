import React, { useState } from 'react';
import { Search, Download, ExternalLink, FileText, CheckCircle, Info } from 'lucide-react';
import { vaForms } from '@/data/conditions';

const FormsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  const useCases = [
    'New claims',
    'Increased ratings',
    'Secondary conditions',
    'PTSD claims',
    'Appeals',
    'Medical records',
  ];

  const filteredForms = vaForms.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUseCase = !selectedUseCase ||
      form.useFor.some(use => use.toLowerCase().includes(selectedUseCase.toLowerCase()));
    
    return matchesSearch && matchesUseCase;
  });

  const formGuides = [
    {
      title: 'Filing Your First Claim',
      forms: ['21-526EZ', '21-4138', '21-4142'],
      description: 'Essential forms for veterans filing their initial disability claim.',
    },
    {
      title: 'PTSD Claims',
      forms: ['21-526EZ', '21-0781', '21-4138'],
      description: 'Required forms for claims related to Post-Traumatic Stress Disorder.',
    },
    {
      title: 'Appealing a Decision',
      forms: ['20-0995', '20-0996', '10182'],
      description: 'Forms for supplemental claims, higher-level reviews, and board appeals.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">VA Forms Library</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Find the right VA forms for your claim. Download official forms and learn when and how to use each one.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Guides */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Form Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {formGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.forms.map(formNum => (
                    <span key={formNum} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                      {formNum}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by form number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedUseCase(null)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  !selectedUseCase 
                    ? 'bg-amber-500 text-navy-900' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Forms
              </button>
              {useCases.map(useCase => (
                <button
                  key={useCase}
                  onClick={() => setSelectedUseCase(useCase)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedUseCase === useCase 
                      ? 'bg-amber-500 text-navy-900' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {useCase}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredForms.map(form => (
            <div key={form.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-navy-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-navy-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-navy-900 text-white text-xs font-bold rounded">
                        {form.number}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{form.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{form.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.useFor.map((use, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Form
                </a>
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  VA.gov
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredForms.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Forms Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Form Filing Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Always keep copies of every form you submit to the VA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use black ink and print clearly if filling out paper forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Submit forms online through VA.gov for faster processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Include your VA file number on all correspondence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsLibrary;
