import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ShieldCheck, CheckCircle2, X, PhoneCall, Shield } from 'lucide-react';

export default function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showPrivacyPolicy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showPrivacyPolicy]);

  return (
    <div className="min-h-screen pb-24 flex flex-col font-sans text-text-main">
      {/* Partner Clarity Banner */}
      <div className="bg-primary text-white py-2 px-6 shadow-sm relative z-10 text-[12px] font-semibold tracking-[0.05em] uppercase text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>You will speak directly with a licensed, top-rated insurance partner.</span>
        </div>
      </div>

      <header className="h-[60px] px-4 sm:px-10 bg-white border-b border-border-card flex justify-center items-center">
        <div className="w-full max-w-4xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-serif italic text-[22px] text-primary font-bold">vctors</span>
          </div>
          <div className="hidden sm:block text-text-label text-[13px]">
            Ref: #4829-AZ
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-2xl mx-auto px-4 py-8 sm:py-16 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="bg-white rounded-[12px] shadow-card border border-border-card overflow-hidden w-full"
        >
          <div className="p-6 sm:p-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-serif text-primary font-bold mb-4 leading-tight">
              Working 26-64? Get $150/Mo Health Plans 📞
            </h1>
            <h2 className="text-[16px] sm:text-lg text-text-label font-semibold mb-8 uppercase tracking-wide">
              Strict qualifying rules apply. Check eligibility instantly.
            </h2>
            
            <div className="space-y-4 text-text-partner text-[15px] sm:text-[16px] leading-relaxed mb-8 bg-bg-partner p-6 rounded-[8px] border-l-4 border-l-primary text-left">
              <p>
                🇺🇸 Working Americans are finally getting a break on healthcare. If you are aged 26–64, employed making over $30k/year, and NOT on Medicaid/Medicare, you could lock in a private comprehensive plan starting as low as <strong>$150/mo</strong>.
              </p>
              <p>
                Plans take effect within 30 days. Click <strong>'Call Now'</strong> to speak with a licensed agent in under 20 minutes to verify your rate.
              </p>
            </div>
            
            <a href="tel:18005550199" className="w-full flex items-center justify-center gap-[10px] bg-primary text-white border-none py-4 px-4 rounded-[8px] font-bold text-[18px] sm:text-[20px] shadow-cta hover:-translate-y-0.5 active:translate-y-0 transition-transform hover:bg-primary-hover no-underline">
              <PhoneCall className="w-6 h-6" />
              <span>Call Now</span>
            </a>

            <div className="mt-8 pt-6 border-t border-border-card text-[10px] leading-[1.5] text-text-label text-left">
              By dialing the number above, I provide my express written consent to be contacted by vctors and its <b className="text-primary font-bold">licensed insurance partners</b> via automated phone calls, pre-recorded messages, and text messages at the phone number I provide during the call, even if my number is on a state or national Do Not Call registry. I understand that consent is not a condition to purchase any goods or services. I also agree to the <button type="button" onClick={() => setShowPrivacyPolicy(true)} className="text-primary underline cursor-pointer hover:text-primary-hover bg-transparent border-none p-0 inline">Privacy Policy</button> and Terms of Service.
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-10 px-4 mt-auto border-t border-border-card bg-bg-main">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 text-xs sm:text-sm text-text-label">
          <p>© {new Date().getFullYear()} vctors. All rights reserved.</p>
          <div className="flex space-x-4">
            <button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-primary transition underline">Privacy Policy</button>
            <button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-primary transition underline">Terms of Service</button>
            <button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-primary transition underline">Licenses</button>
          </div>
          <p className="max-w-2xl text-[10px] sm:text-xs">
            We are not an insurance carrier. We connect individuals with licensed insurance agents and partners who can provide coverage options. Participating agencies may vary based on your state and individual profile.
          </p>
        </div>
      </footer>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 h-[70px] bg-white border-t-[2px] border-t-primary z-[100] sm:p-0 sm:bg-transparent sm:border-none sm:shadow-none sm:pointer-events-none sm:h-auto pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-4xl mx-auto flex h-full items-center justify-center sm:justify-end sm:p-6">
          <a
            href="tel:18005550199"
            className="flex items-center justify-center gap-[12px] bg-primary text-white py-[10px] px-[32px] rounded-[50px] font-bold shadow-cta transition-transform hover:scale-105 pointer-events-auto w-[calc(100%-2rem)] mx-4 sm:w-auto sm:mx-0"
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              <PhoneCall className="w-5 h-5" />
            </motion.div>
            <span className="text-[13px] sm:text-base">Speak with a Licensed Agent: (800) 555-1234</span>
          </a>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-10 pb-4 sm:p-6 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowPrivacyPolicy(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-[12px] shadow-card overflow-hidden flex flex-col max-h-[90vh] border border-border-card"
            >
              <div className="p-4 sm:p-6 border-b border-border-card flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-xl font-bold text-primary">Privacy Policy & Disclosures</h2>
                <button 
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="p-2 hover:bg-bg-input rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-text-label" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-grow text-[14px] text-text-partner space-y-6">
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">1. Not an Insurance Carrier</h3>
                  <p>vctors is not an insurance carrier. We act as an intermediary, matching consumers with independent licensed insurance agents, providers, and brokerages who offer various plans. We do not underwrite insurance or guarantee coverage.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">2. TCPA Consent and Contact</h3>
                  <p>By connecting via phone, you are providing your express written consent under the Telephone Consumer Protection Act (TCPA) to be contacted by vctors and our network of licensed agents. This contact may include automated dialing systems, artificial/pre-recorded voices, and SMS text messages to the phone number you call from, even if it is on a state or national Do Not Call list. Consent is not required as a condition of purchasing any goods or services.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">3. Data Collection and Usage</h3>
                  <p>We may collect personal information such as your phone number, and basic health and eligibility information that you provide over the phone solely for the purpose of connecting you with appropriate insurance partners. We may use digital tracking technologies (such as cookies) to monitor website performance and improve our services.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">4. Sharing Your Information</h3>
                  <p>To fulfill your request for a quote, we may securely route your call and basic information to our partnered licensed insurance providers. These third parties will use your data to determine eligibility and provide customized quotes. They will have their own privacy practices and policies once they receive your call.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">5. Your Rights</h3>
                  <p>You may opt-out of receiving communications at any time. To stop receiving text messages, simply reply "STOP" to any message. To revoke consent for phone calls, inform the caller during the call or contact our support team. Depending on your state of residence (e.g., California), you may have additional rights to request access to or deletion of your data.</p>
                </section>
              </div>
              <div className="p-4 sm:p-6 border-t border-border-card bg-bg-input text-right">
                <button 
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="px-6 py-2 bg-primary text-white rounded-[8px] hover:bg-primary-hover transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
