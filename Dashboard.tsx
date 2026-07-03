import React, { useState, useEffect } from 'react';
import { FileText, Upload, Calculator, Clock, CheckCircle, AlertCircle, Plus, ChevronRight, LogOut, User, Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DashboardProps {
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

interface UserProfile {
  full_name: string;
  email: string;
  branch_of_service: string;
  current_rating: number;
  subscription_type: string;
}

interface Claim {
  id: string;
  claim_type: string;
  status: string;
  conditions: any[];
  created_at: string;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage, onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Load profile
        const { data: profileData } = await supabase
          .from('veteran_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Load claims
        const { data: claimsData } = await supabase
          .from('claims')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (claimsData) {
          setClaims(claimsData);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-amber-100 text-amber-700';
      case 'denied': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const quickActions = [
    {
      icon: Plus,
      title: 'New Claim',
      description: 'Start a new disability claim',
      action: () => setCurrentPage('claim-builder'),
      color: 'bg-amber-500',
    },
    {
      icon: FileText,
      title: 'Find Forms',
      description: 'Download VA forms',
      action: () => setCurrentPage('forms'),
      color: 'bg-blue-500',
    },
    {
      icon: Calculator,
      title: 'Rating Calculator',
      description: 'Calculate combined rating',
      action: () => setCurrentPage('claim-builder'),
      color: 'bg-green-500',
    },
    {
      icon: Upload,
      title: 'Upload Documents',
      description: 'Add evidence to your claim',
      action: () => {},
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Veteran'}
              </h1>
              <p className="text-gray-300">
                {profile?.branch_of_service ? `${profile.branch_of_service} Veteran` : 'Manage your claims and track your progress'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Current Rating</div>
                <div className="text-3xl font-bold text-amber-400">{profile?.current_rating || 0}%</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white rounded-xl p-4 text-left hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claims Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Your Claims</h2>
                <button
                  onClick={() => setCurrentPage('claim-builder')}
                  className="text-amber-600 font-medium text-sm flex items-center gap-1 hover:text-amber-700"
                >
                  Start New Claim
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {claims.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {claims.map((claim) => (
                    <div key={claim.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 capitalize">
                              {claim.claim_type?.replace('_', ' ') || 'New'} Claim
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                              {claim.status?.replace('_', ' ') || 'Draft'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {claim.conditions?.length || 0} conditions • Created {new Date(claim.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Claims Yet</h3>
                  <p className="text-gray-500 mb-4">Start your first claim to track your progress here.</p>
                  <button
                    onClick={() => setCurrentPage('claim-builder')}
                    className="px-6 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                  >
                    Start Your First Claim
                  </button>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Getting Started Checklist</h2>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Create your account</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('conditions')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-gray-700">Research your conditions</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
                <button 
                  onClick={() => setCurrentPage('forms')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-gray-700">Download necessary VA forms</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
                <button 
                  onClick={() => setCurrentPage('claim-builder')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-gray-700">Build your claim</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
                <button 
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-gray-700">Gather your evidence</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-navy-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-navy-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{profile?.full_name || 'Veteran'}</h3>
                  <p className="text-sm text-gray-500">{profile?.email}</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subscription</span>
                  <span className="font-medium text-gray-900 capitalize">{profile?.subscription_type || 'Free'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current Rating</span>
                  <span className="font-medium text-gray-900">{profile?.current_rating || 0}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Branch</span>
                  <span className="font-medium text-gray-900">{profile?.branch_of_service || 'Not set'}</span>
                </div>
              </div>
              {profile?.subscription_type === 'free' && (
                <button
                  onClick={() => setCurrentPage('pricing')}
                  className="w-full mt-4 py-2 bg-amber-500 text-navy-900 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
              <div className="space-y-3">
                <a
                  href="https://www.va.gov/disability/file-disability-claim-form-21-526ez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  File claim on VA.gov
                </a>
                <a
                  href="https://www.va.gov/disability/how-to-file-claim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  VA claims process guide
                </a>
                <a
                  href="https://www.va.gov/vso/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Find a VSO near you
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Our team is here to support you through the claims process.
              </p>
              <button className="w-full py-2 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
