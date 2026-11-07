import React, { useState } from 'react';
import { Donor, BloodGroup, EligibilityAnswers } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  QrCode, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  FileCheck, 
  Heart, 
  Download,
  Share2
} from 'lucide-react';

interface DonorRegistrationProps {
  onRegisterDonor: (newDonor: Donor) => void;
  onViewCard: (donor: Donor) => void;
}

export const DonorRegistration: React.FC<DonorRegistrationProps> = ({
  onRegisterDonor,
  onViewCard
}) => {
  const [step, setStep] = useState<number>(1);

  // Step 1: Medical Eligibility
  const [eligibility, setEligibility] = useState<EligibilityAnswers>({
    ageValid: true,
    weightValid: true,
    hemoglobinValid: true,
    noRecentTattoo: true,
    noRecentSurgery: true,
    noInfection: true,
    alcoholFree: true,
    donationInterval: true
  });

  // Step 2 & 3: Personal & Location Details
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'O+' as BloodGroup,
    age: 25,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    phone: '',
    email: '',
    city: 'Delhi NCR',
    area: '',
    pincode: '',
    privacyHidePhone: false,
    bio: 'Ready to donate in emergency.'
  });

  const [registeredDonor, setRegisteredDonor] = useState<Donor | null>(null);

  const isEligible = Object.values(eligibility).every((val) => val === true);

  const handleEligibilityToggle = (key: keyof EligibilityAnswers) => {
    setEligibility((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) {
      alert('Based on medical criteria, you are temporarily deferred from donating blood. Please consult the safety rules.');
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim() || !formData.area.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const uniqueId = `LP-DNR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonor: Donor = {
      id: uniqueId,
      name: formData.name,
      bloodGroup: formData.bloodGroup,
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      area: formData.area,
      pincode: formData.pincode || '110001',
      isAvailable: true,
      lastDonationDate: 'First Time / Eligible',
      totalDonations: 0,
      isVerified: true,
      verificationBadgeType: 'COMMUNITY_VERIFIED',
      privacyHidePhone: formData.privacyHidePhone,
      donorLevel: 'Bronze Supporter',
      eligibleDate: 'Available Now',
      bio: formData.bio
    };

    onRegisterDonor(newDonor);
    setRegisteredDonor(newDonor);
    setStep(4); // Success step
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-white" />
            1 Blood Donation Can Save Up To 3 Lives
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Register as a Verified Voluntary Donor
          </h1>
          <p className="mt-2 text-rose-100 text-xs sm:text-sm max-w-xl mx-auto">
            Join the community of verified life savers. Complete a 60-second medical safety screening and receive your digital donor ID card instantly.
          </p>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between text-xs font-bold text-slate-500">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-rose-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
          <span className="hidden sm:inline">Medical Screening</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-rose-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
          <span className="hidden sm:inline">Personal Info</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-rose-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
          <span className="hidden sm:inline">Location & Privacy</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <div className={`flex items-center gap-2 ${step >= 4 ? 'text-rose-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
          <span className="hidden sm:inline">Donor Card</span>
        </div>
      </div>

      {/* STEP 1: Clinical Pre-Screening Questionnaire */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Step 1: Clinical Eligibility Check</h2>
              <p className="text-xs text-slate-500">Standard World Health Organization (WHO) safety criteria</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'ageValid', label: 'Are you between 18 and 65 years old?', desc: 'Legal age range for voluntary whole blood donation' },
              { key: 'weightValid', label: 'Is your body weight at least 50 kg (110 lbs)?', desc: 'Crucial to ensure donor safety during standard 450ml draw' },
              { key: 'hemoglobinValid', label: 'Hemoglobin level is normal (≥ 12.5 g/dL)?', desc: 'Ensures no underlying anemia before donation' },
              { key: 'donationInterval', label: 'Last blood donation was more than 90 days ago?', desc: 'Required 3 months for men / 4 months for women to replenish iron stores' },
              { key: 'noRecentTattoo', label: 'No tattoo, body piercing, or acupuncture in past 6 months?', desc: 'Standard safety window against blood-borne viral transmission' },
              { key: 'noRecentSurgery', label: 'No major surgery or dental extraction in last 6 months?', desc: 'Allows full systemic recovery and wound healing' },
              { key: 'noInfection', label: 'Free from active cold, flu, fever, or antibiotic drugs in past 14 days?', desc: 'Ensures you are at 100% active immunity' },
              { key: 'alcoholFree', label: 'No alcohol consumed in the past 24 hours?', desc: 'Prevents dehydration and dizziness' },
            ].map(({ key, label, desc }) => {
              const checked = eligibility[key as keyof EligibilityAnswers];
              return (
                <div
                  key={key}
                  onClick={() => handleEligibilityToggle(key as keyof EligibilityAnswers)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                    checked
                      ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
                      : 'border-rose-200 bg-rose-50/50 hover:bg-rose-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-bold text-slate-800">{label}</p>
                    <p className="text-[11px] text-slate-500">{desc}</p>
                  </div>
                  <div className="pt-0.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-extrabold ${
                      checked ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {checked ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verdict Box */}
          <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${
            isEligible
              ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
              : 'bg-amber-100/70 border-amber-300 text-amber-900'
          }`}>
            <div className="flex items-center gap-2.5">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div>
                <strong className="block font-bold">
                  {isEligible ? 'Clinical Screening Passed: You Are Eligible To Donate!' : 'Temporary Deferral Detected'}
                </strong>
                <span className="text-xs opacity-90">
                  {isEligible
                    ? 'All medical prerequisites are satisfied. Proceed to registration.'
                    : 'One or more items do not match donation criteria. You can register once criteria are met.'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              disabled={!isEligible}
              onClick={() => setStep(2)}
              className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Continue to Personal Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Personal Details */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Step 2: Personal Information</h2>
              <p className="text-xs text-slate-500">Your identity and verified blood group</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name (as per Govt ID):</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Malhotra"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Blood Group Choice */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Select Your Blood Group:</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                    className={`py-2 rounded-xl text-sm font-black transition border ${
                      formData.bloodGroup === bg
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Age (Years):</label>
                <input
                  type="number"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gender:</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number (Verified WhatsApp / Call):</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98110 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address:</label>
                <input
                  type="email"
                  placeholder="donor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
            >
              Back
            </button>
            <button
              disabled={!formData.name || !formData.phone}
              onClick={() => setStep(3)}
              className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Next: Location & Privacy</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Location & Privacy Preferences */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Step 3: Location & Privacy Protection</h2>
              <p className="text-xs text-slate-500">Specify your neighborhood so nearby emergency cases reach you</p>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City / Metropolitan Area:</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {CITIES.filter(c => c !== 'All Cities').map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Locality / Sector / Area:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saket, Sector 14, Indiranagar"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Donor Short Bio / Availability Note:</label>
              <textarea
                rows={2}
                placeholder="e.g. Ready to travel within 15km for hospital emergencies. Available weekends."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Privacy Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Privacy & Contact Preferences</h4>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyHidePhone}
                  onChange={(e) => setFormData({ ...formData, privacyHidePhone: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded border-slate-300 mt-0.5 focus:ring-rose-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Enable Privacy Phone Masking
                  </span>
                  <span className="text-[11px] text-slate-500">
                    If checked, your mobile number will remain hidden on public search. Requesters will have to send an automated verified prompt to you.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Registration & Generate Card</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Success & Digital Donor Card */}
      {step === 4 && registeredDonor && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">Registration Successful!</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Welcome to the LifePulse community, <strong>{registeredDonor.name}</strong>! You are now a verified voluntary donor.
            </p>
          </div>

          {/* Digital Donor Card Preview */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-rose-800 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
                <span className="font-extrabold tracking-tight text-white text-base">LifePulse <span className="text-rose-400">Donor ID</span></span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                VERIFIED VOLUNTEER
              </span>
            </div>

            <div className="py-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-rose-300/80 tracking-wider">Donor Name</p>
                <h3 className="text-lg font-black text-white">{registeredDonor.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{registeredDonor.area}, {registeredDonor.city}</p>
                <p className="text-[11px] font-mono text-rose-200/80 mt-1">ID: {registeredDonor.id}</p>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-rose-600 to-red-700 flex flex-col items-center justify-center shadow-lg border border-rose-400/40">
                <span className="text-2xl font-black text-white">{registeredDonor.bloodGroup}</span>
                <span className="text-[9px] font-bold text-rose-200">BLOOD</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Status</span>
                <strong className="text-emerald-400">Available For Emergency</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Level</span>
                <strong className="text-amber-300">{registeredDonor.donorLevel}</strong>
              </div>
              <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center shadow">
                <QrCode className="w-8 h-8 text-slate-900" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onViewCard(registeredDonor)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Open Full Digital Card & Print</span>
            </button>
            <button
              onClick={() => setStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
            >
              Register Another Donor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
