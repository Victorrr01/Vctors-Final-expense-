import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ShieldCheck, CheckCircle2, X, PhoneCall, Shield } from 'lucide-react';

const STATES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

const formatPhone = (val: string) => {
  const cleaned = val.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return val;
  if (!match[2]) return match[1];
  if (!match[3]) return `(${match[1]}) ${match[2]}`;
  return `(${match[1]}) ${match[2]}-${match[3]}`;
};

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    state: '',
    coverageFor: 'Self',
    gender: '',
    tobaccoUse: 'No',
    tcpaAgreed: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tcpaAgreed) {
      alert('Please agree to the consent terms to proceed.');
      return;
    }
    // Simulate API submission
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <span>You will speak directly with a licensed, top-rated insurance partner — no call centers.</span>
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

      <main className="flex-grow w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[12px] shadow-card border border-border-card overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-border-card bg-white">
                <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold mb-2">Final Expense Insurance Quote</h1>
                <p className="text-[14px] text-text-partner">Fill out the fast form below to connect with a licensed partner and get your customized quote.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:px-8 sm:pb-8 sm:pt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="firstName" className="text-[11px] font-bold uppercase text-text-label">First Name</label>
                    <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none" placeholder="Jane" />
                  </div>
                  {/* Last Name */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="lastName" className="text-[11px] font-bold uppercase text-text-label">Last Name</label>
                    <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="phone" className="text-[11px] font-bold uppercase text-text-label">Phone Number</label>
                    <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} maxLength={14} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none" placeholder="(555) 000-0000" />
                  </div>
                  {/* Date of Birth */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="dob" className="text-[11px] font-bold uppercase text-text-label">Date of Birth</label>
                    <input required type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* State */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="state" className="text-[11px] font-bold uppercase text-text-label">State</label>
                    <select required id="state" name="state" value={formData.state} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none">
                      <option value="" disabled>Select State</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Coverage For */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="coverageFor" className="text-[11px] font-bold uppercase text-text-label">Coverage For</label>
                    <select required id="coverageFor" name="coverageFor" value={formData.coverageFor} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none">
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Both">Both (Self & Spouse)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="gender" className="text-[11px] font-bold uppercase text-text-label">Gender</label>
                    <select required id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none">
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  {/* Tobacco Use */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="tobaccoUse" className="text-[11px] font-bold uppercase text-text-label">Tobacco Use (Last 12 months)</label>
                    <select required id="tobaccoUse" name="tobaccoUse" value={formData.tobaccoUse} onChange={handleChange} className="w-full p-[10px] rounded-[6px] border border-border-input bg-bg-input text-[14px] focus:ring-1 focus:ring-primary focus:border-primary transition-colors outline-none">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>

                {/* TCPA Checkbox */}
                <div className="pt-4 mt-2">
                  <label className="flex items-start gap-[10px] cursor-pointer group text-[10px] leading-[1.4] text-text-label">
                    <div className="flex-shrink-0 mt-[2px]">
                      <input 
                        type="checkbox" 
                        name="tcpaAgreed" 
                        required
                        checked={formData.tcpaAgreed} 
                        onChange={handleChange} 
                        className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary outline-none cursor-pointer"
                      />
                    </div>
                    <div>
                      By checking this box and clicking the button below, I provide my express written consent to be contacted by vctors and its <b className="text-primary font-bold">licensed insurance partners</b> via automated phone calls, pre-recorded messages, and text messages at the phone number provided above, even if my number is on a Do Not Call registry. I understand that consent is not a condition to purchase any goods or services. I also agree to the <button type="button" onClick={() => setShowPrivacyPolicy(true)} className="text-primary underline cursor-pointer">Privacy Policy</button> and Terms of Service.
                    </div>
                  </label>
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-[10px] bg-primary text-white border-none py-4 px-4 rounded-[8px] font-bold text-[16px] sm:text-[18px] mt-4 cursor-pointer hover:bg-primary-hover transition-colors shadow-cta hover:-translate-y-0.5 active:translate-y-0">
                  <PhoneCall className="w-5 h-5" />
                  <span>Call a Licensed Agent Now</span>
                </button>
              </form>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-white rounded-[12px] shadow-card border border-border-card overflow-hidden p-8 sm:p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-bg-partner rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Request Received!</h2>
              <p className="text-lg text-text-partner mb-8 max-w-md mx-auto">
                Thank you, {formData.firstName}. Your information has been securely received by our system.
              </p>
              
              <div className="bg-bg-partner border-l-4 border-l-primary rounded-r-[12px] rounded-l-[4px] p-6 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Speak with a Partner Now</h3>
                    <p className="text-[14px] text-text-partner">Skip the wait. Connect instantly with a licensed insurance expert—no call centers, just real advice.</p>
                  </div>
                </div>
              </div>

              <a href="tel:18005550199" className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-hover text-white font-bold text-[16px] py-4 px-8 rounded-[8px] shadow-cta transition-transform hover:scale-105 w-full sm:w-auto">
                <PhoneCall className="w-5 h-5" />
                <span>Call (800) 555-0199 Now</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
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
                  <p>By submitting our web form, you are providing your express written consent under the Telephone Consumer Protection Act (TCPA) to be contacted by vctors and our network of licensed agents. This contact may include automated dialing systems, artificial/pre-recorded voices, and SMS text messages to the phone number you provided, even if it is on a state or national Do Not Call list. Consent is not required as a condition of purchasing any goods or services.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">3. Data Collection and Usage</h3>
                  <p>We collect personal information such as your name, phone number, date of birth, state of residence, and basic health descriptors (like tobacco use) solely for the purpose of connecting you with appropriate insurance partners. We may use digital tracking technologies (such as cookies) to monitor website performance and improve our services.</p>
                </section>
                <section>
                  <h3 className="font-semibold text-primary text-base mb-2">4. Sharing Your Information</h3>
                  <p>To fulfill your request for a quote, we transmit the information you submit on this site to our partnered licensed insurance providers. These third parties will use your data to determine eligibility and provide customized quotes. They will have their own privacy practices and policies once they receive your information.</p>
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
