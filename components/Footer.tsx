import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-deepPurple text-brand-cream mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-orange">HemoFix</h3>
            <p className="text-sm opacity-80">
              আপনার কোডিং এবং প্রযুক্তিগত সমস্যার দ্রুততম এবং নির্ভুল সমাধান। স্ব-শিক্ষণশীল এআই প্রযুক্তি দ্বারা চালিত।
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-orange">লিঙ্কস</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-orange transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">সেবাসমূহ</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">গোপনীয়তা নীতি</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-orange">যোগাযোগ</h3>
            <p className="text-sm opacity-80">ঢাকা, বাংলাদেশ</p>
            <p className="text-sm opacity-80">ইমেইল: support@hemofix.com</p>
          </div>
        </div>
        
        <div className="border-t border-brand-orange/30 pt-6 text-center">
            {/* Mandatory Footer Text */}
            <p className="text-base font-medium text-brand-orange">
              @Hemontu Incorporation এর একটি সার্ভিস
            </p>
        </div>
      </div>
    </footer>
  );
};