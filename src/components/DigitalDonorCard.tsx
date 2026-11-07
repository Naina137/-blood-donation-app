import React, { useRef } from 'react';
import { Donor } from '../types';
import { 
  Heart, 
  ShieldCheck, 
  QrCode, 
  Award, 
  Printer, 
  Share2, 
  UserPlus, 
  CheckCircle2, 
  Download,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

interface DigitalDonorCardProps {
  currentDonor: Donor | null;
  onRegisterClick: () => void;
  onSelectSampleDonor: (donorId: string) => void;
  allDonors: Donor[];
}

export const DigitalDonorCard: React.FC<DigitalDonorCardProps> = ({
  currentDonor,
  onRegisterClick,
  onSelectSampleDonor,
  allDonors
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (!currentDonor) return;
    const text = `🪪 I am a Verified Voluntary Blood Donor on LifePulse!
Blood Group: ${currentDonor.bloodGroup}
Donor ID: ${currentDonor.id}
Level: ${currentDonor.donorLevel}
Together, we save lives. Join the registry or request blood in emergency on LifePulse.`;

    if (navigator.share) {
      navigator.share({
        title: 'LifePulse Verified Blood Donor Card',
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Donor ID details copied to clipboard!');
    }
  };

  const activeDonor = currentDonor || allDonors[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Official Voluntary Life Saver Credential
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Digital Verified Blood Donor Card
        </h1>
        <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
          Carry your verified emergency blood donor credential with quick QR verification for blood banks and hospital trauma centers.
        </p>

        {/* Quick Switcher */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400">Viewing Donor:</span>
          <select
            value={activeDonor?.id}
            onChange={(e) => onSelectSampleDonor(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-rose-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            {allDonors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.bloodGroup})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* The Printable Digital Card */}
      {activeDonor && (
        <div className="space-y-4">
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-rose-950 via-slate-950 to-rose-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-rose-600/40 relative overflow-hidden print:border-black print:text-black print:bg-white"
          >
            {/* Watermark Drop */}
            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
              <Heart className="w-72 h-72 fill-white" />
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center shadow-md shadow-rose-600/50">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight leading-none text-white">
                    Life<span className="text-rose-400">Pulse</span>
                  </h3>
                  <span className="text-[10px] text-rose-200 uppercase tracking-widest font-bold">
                    National Voluntary Blood Donor ID
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> VERIFIED DONOR
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {activeDonor.id}</p>
              </div>
            </div>

            {/* Main Card Body */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="sm:col-span-2 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-rose-300 tracking-wider">Donor Full Name</span>
                  <h2 className="text-2xl font-black text-white">{activeDonor.name}</h2>
                  <p className="text-xs text-slate-300">{activeDonor.gender}, {activeDonor.age} Years</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">City / Area</span>
                    <strong className="text-slate-200">{activeDonor.area}, {activeDonor.city}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Registered Phone</span>
                    <strong className="text-slate-200">{activeDonor.phone}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    {activeDonor.donorLevel}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    ❤️ {activeDonor.totalDonations} Donations Completed
                  </span>
                </div>
              </div>

              {/* Big Blood Badge & QR */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-b from-rose-600 to-red-700 flex flex-col items-center justify-center text-white shadow-xl shadow-rose-900/50 border border-rose-400/40">
                  <span className="text-3xl font-black">{activeDonor.bloodGroup}</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-rose-200">BLOOD GROUP</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-lg">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">Scan to Verify</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-rose-500/30 flex flex-wrap items-center justify-between text-[11px] text-rose-200/90 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Eligibility Status: <strong className="text-white">{activeDonor.eligibleDate}</strong></span>
              </div>
              <span className="text-slate-400 text-[10px]">
                Authorized by National Blood Safety Network Standards
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Card Details</span>
            </button>
            <button
              onClick={onRegisterClick}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-rose-600" />
              <span>Register New Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
