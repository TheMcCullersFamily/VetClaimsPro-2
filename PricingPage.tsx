import React, { useState } from 'react';
import { Check, X, Star, Shield, Zap, Clock, Users, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PricingPageProps {
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
}

const PricingPage: React.FC<PricingPageProps> = ({ setShowAuthModal, setAuthMode, isLoggedIn }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'lifetime'>('lifetime');

  const handleCheckout = async (priceType: 'monthly' | 'lifetime') => {
    if (!isLoggedIn) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }

    setLoading(priceType);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceType },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Unable to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Get started with basic resources',
      features: [
        { text: 'Browse conditions library', included: true },
        { text: 'View VA forms list', included: true },
        { text: 'Basic claim builder (3 conditions)', included: true },
        { text: 'Community resources', included: true },
        { text: 'Save claim progress', included: false },
        { text: 'Document storage', included: false },
        { text: 'Detailed evidence guides', included: false },
        { text: 'Rating calculator', included: false },
        { text: 'Priority support', included: false },
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: '$29',
      period: '/month',
      description: 'Full access with flexible billing',
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'Unlimited conditions', included: true },
        { text: 'Save claim progress', included: true },
        { text: 'Secure document storage', included: true },
        { text: 'Detailed evidence guides', included: true },
        { text: 'Advanced rating calculator', included: true },
        { text: 'C&P exam preparation', included: true },
        { text: 'Email support', included: true },
        { text: 'Cancel anytime', included: true },
      ],
      cta: 'Start Monthly',
      popular: false,
    },
    {
      id: 'lifetime',
      name: 'Pro Lifetime',
      price: '$497',
      period: 'one-time',
      description: 'Best value - pay once, access forever',
      features: [
        { text: 'Everything in Pro Monthly', included: true },
        { text: 'Lifetime access', included: true },
        { text: 'All future updates', included: true },
        { text: 'Priority support', included: true },
        { text: 'Exclusive video guides', included: true },
        { text: 'Buddy statement templates', included: true },
        { text: 'Nexus letter guidance', included: true },
        { text: 'Appeal strategies', included: true },
        { text: 'One-time payment', included: true },
      ],
      cta: 'Get Lifetime Access',
      popular: true,
      savings: 'Save $851 vs monthly',
    },
  ];

  const testimonials = [
    {
      name: 'James M.',
      branch: 'Army Veteran',
      rating: 5,
      text: 'Went from 30% to 90% using the claim builder. The evidence checklist was a game-changer.',
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052844413_bd69e02c.png',
    },
    {
      name: 'Sarah K.',
      branch: 'Navy Veteran',
      rating: 5,
      text: 'Finally understood what evidence I needed. Got my PTSD claim approved on the first try.',
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052848720_69a45922.png',
    },
    {
      name: 'Michael R.',
      branch: 'Marine Corps Veteran',
      rating: 5,
      text: 'The conditions library helped me discover secondary conditions I didn\'t know I could claim.',
      image: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765052844855_13674a65.png',
    },
  ];

  const faqs = [
    {
      question: 'Is this affiliated with the VA?',
      answer: 'No, VetClaims Pro is an independent educational resource. We provide guidance and tools to help veterans navigate the claims process, but we are not affiliated with the Department of Veterans Affairs.',
    },
    {
      question: 'Can I cancel my monthly subscription?',
      answer: 'Yes, you can cancel your monthly subscription at any time. Your access will continue until the end of your current billing period.',
    },
    {
      question: 'What\'s included in lifetime access?',
      answer: 'Lifetime access includes all current features plus all future updates and improvements. You pay once and have access forever.',
    },
    {
      question: 'Do you guarantee results?',
      answer: 'We cannot guarantee specific claim outcomes as decisions are made by the VA. However, our tools and guidance are designed to help you submit the strongest possible claim.',
    },
    {
      question: 'Is my information secure?',
      answer: 'Yes, we use bank-level encryption to protect your data. Your documents and personal information are never shared with third parties.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Trusted by Thousands of Veterans
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Invest in Your <span className="text-amber-400">Future Benefits</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get the tools and guidance you need to file successful disability claims. Choose the plan that works for you.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-amber-500 scale-105 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-navy-900 text-center py-2 text-sm font-bold">
                  MOST POPULAR - BEST VALUE
                </div>
              )}
              <div className={`p-6 md:p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="mb-4 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium inline-block">
                    {plan.savings}
                  </div>
                )}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (plan.id === 'free') {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    } else {
                      handleCheckout(plan.id as 'monthly' | 'lifetime');
                    }
                  }}
                  disabled={loading === plan.id}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    plan.popular
                      ? 'bg-amber-500 text-navy-900 hover:bg-amber-400 shadow-lg shadow-amber-500/25'
                      : 'bg-navy-900 text-white hover:bg-navy-800'
                  } ${loading === plan.id ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loading === plan.id ? 'Processing...' : plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-navy-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Secure & Private</h4>
            <p className="text-sm text-gray-600">Bank-level encryption</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-navy-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Instant Access</h4>
            <p className="text-sm text-gray-600">Start immediately</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-navy-600" />
            </div>
            <h4 className="font-semibold text-gray-900">24/7 Access</h4>
            <p className="text-sm text-gray-600">Use anytime, anywhere</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-navy-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Veteran-Founded</h4>
            <p className="text-sm text-gray-600">By vets, for vets</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Veterans Are Saying
          </h2>
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
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 group">
              <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                {faq.question}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-green-100 max-w-xl mx-auto">
            If you're not completely satisfied with VetClaims Pro, contact us within 30 days for a full refund. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
