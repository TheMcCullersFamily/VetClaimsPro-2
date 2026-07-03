import React from 'react';
import { ArrowRight, CheckCircle, FileText, Calculator, BookOpen, Shield, Users, Award, Star, ChevronRight, Stethoscope } from 'lucide-react';
import HeroSection from './HeroSection';
import { conditions, conditionCategories } from '@/data/conditions';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, setShowAuthModal, setAuthMode }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Conditions Library',
      description: 'Research 50+ service-connected conditions with symptoms, evidence requirements, and success tips.',
      action: () => setCurrentPage('conditions'),
    },
    {
      icon: FileText,
      title: 'VA Forms Guide',
      description: 'Find the right forms for your claim with clear explanations of when and how to use each one.',
      action: () => setCurrentPage('forms'),
    },
    {
      icon: Calculator,
      title: 'Claim Builder',
      description: 'Build your claim step-by-step with our guided wizard and see your estimated combined rating.',
      action: () => setCurrentPage('claim-builder'),
    },
    {
      icon: Stethoscope,
      title: 'C&P Exam Prep',
      description: 'Prepare for your Compensation & Pension exam with tips, common questions, and printable checklists.',
      action: () => setCurrentPage('cp-exam'),
    },
  ];



  const steps = [
    {
      number: '01',
      title: 'Research Your Conditions',
      description: 'Use our conditions library to understand what qualifies for service connection and what evidence you need.',
    },
    {
      number: '02',
      title: 'Gather Your Evidence',
      description: 'Follow our evidence checklist to collect medical records, buddy statements, and nexus letters.',
    },
    {
      number: '03',
      title: 'Build Your Claim',
      description: 'Use our claim builder to organize your conditions and see your estimated combined rating.',
    },
    {
      number: '04',
      title: 'File with Confidence',
      description: 'Submit your claim to the VA with all the evidence you need for the best chance of success.',
    },
  ];

  const popularConditions = conditions.slice(0, 8);

  const testimonials = [
    {
      name: 'Robert T.',
      branch: 'Army, 20 years',
      text: 'After being denied twice, I used VetClaims Pro to understand what evidence I was missing. Got approved for 70% on my third attempt.',
      rating: 5,
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052844413_bd69e02c.png',
    },
    {
      name: 'Maria S.',
      branch: 'Air Force, 8 years',
      text: 'The conditions library helped me discover I could claim my migraines as secondary to my service-connected neck injury. Game changer!',
      rating: 5,
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052848720_69a45922.png',
    },
    {
      name: 'David L.',
      branch: 'Navy, 12 years',
      text: 'Simple, straightforward guidance. Went from 0% to 80% in 8 months. Worth every penny of the lifetime membership.',
      rating: 5,
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052844855_13674a65.png',
    },
  ];

  const stats = [
    { value: '50+', label: 'Conditions Covered' },
    { value: '12', label: 'VA Forms Explained' },
    { value: '24/7', label: 'Access to Resources' },
    { value: '100%', label: 'Veteran-Focused' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        setCurrentPage={setCurrentPage} 
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
      />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to File Successfully
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive tools guide you through every step of the VA disability claims process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.action}
                className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg hover:border-amber-300 transition-all group"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <feature.icon className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center text-amber-600 font-medium text-sm group-hover:text-amber-700">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our proven 4-step process to build a strong disability claim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-amber-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-0.5 bg-amber-200" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('claim-builder')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-navy-900 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
            >
              Start Your Claim Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Conditions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Conditions
              </h2>
              <p className="text-lg text-gray-600">
                Explore commonly claimed service-connected disabilities.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('conditions')}
              className="mt-4 md:mt-0 text-amber-600 font-semibold flex items-center gap-1 hover:text-amber-700"
            >
              View all conditions
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularConditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setCurrentPage('conditions')}
                className="bg-gray-50 rounded-xl p-5 text-left hover:bg-amber-50 hover:border-amber-300 border border-transparent transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{condition.name}</h3>
                <p className="text-sm text-gray-500 capitalize mb-3">{condition.category.replace('-', ' ')}</p>
                <div className="flex gap-1">
                  {condition.commonRatings.slice(0, 3).map(rating => (
                    <span key={rating} className="px-2 py-0.5 bg-navy-100 text-navy-700 text-xs rounded-full font-medium">
                      {rating}%
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Veterans Trust VetClaims Pro
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands of veterans who have successfully navigated the claims process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.branch}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-navy-900 mb-2">{stat.value}</div>
                <div className="text-navy-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get the Benefits You Deserve?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Start building your claim today with our comprehensive tools and step-by-step guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('claim-builder')}
                className="px-8 py-4 bg-amber-500 text-navy-900 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors"
              >
                Start Your Claim Free
              </button>
              <button
                onClick={() => setCurrentPage('pricing')}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
