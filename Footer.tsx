import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { label: 'Conditions Library', page: 'conditions' },
      { label: 'VA Forms', page: 'forms' },
      { label: 'Claim Builder', page: 'claim-builder' },
      { label: 'C&P Exam Prep', page: 'cp-exam' },
    ],

    support: [
      { label: 'Help Center', page: 'home' },
      { label: 'Contact Us', page: 'home' },
      { label: 'FAQs', page: 'pricing' },
      { label: 'Community Forum', page: 'home' },
    ],
    company: [
      { label: 'About Us', page: 'home' },
      { label: 'Our Mission', page: 'home' },
      { label: 'Testimonials', page: 'pricing' },
      { label: 'Careers', page: 'home' },
    ],
    legal: [
      { label: 'Privacy Policy', page: 'home' },
      { label: 'Terms of Service', page: 'home' },
      { label: 'Disclaimer', page: 'home' },
      { label: 'Accessibility', page: 'home' },
    ],
  };

  const externalResources = [
    { label: 'VA.gov', url: 'https://www.va.gov' },
    { label: 'eBenefits', url: 'https://www.ebenefits.va.gov' },
    { label: 'MyHealtheVet', url: 'https://www.myhealth.va.gov' },
    { label: 'Veterans Crisis Line', url: 'https://www.veteranscrisisline.net' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">VetClaims<span className="text-amber-400">Pro</span></h3>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering veterans to navigate the VA disability claims process with confidence. Get the benefits you've earned.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-navy-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-navy-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-navy-900 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-navy-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* VA Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">VA Resources</h4>
            <ul className="space-y-3">
              {externalResources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Crisis Line Banner */}
        <div className="mt-12 p-6 bg-red-900/50 rounded-xl border border-red-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Veterans Crisis Line</h4>
                <p className="text-red-200 text-sm">Free, confidential support 24/7</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="tel:988"
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors"
              >
                Call 988, Press 1
              </a>
              <a
                href="sms:838255"
                className="px-6 py-3 border border-red-400 text-red-200 rounded-lg font-medium hover:bg-red-800 transition-colors"
              >
                Text 838255
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} VetClaims Pro. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <button
                  key={link.label}
                  onClick={() => setCurrentPage(link.page)}
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            Disclaimer: VetClaims Pro is not affiliated with the Department of Veterans Affairs. 
            This website provides educational information only and does not constitute legal or medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
