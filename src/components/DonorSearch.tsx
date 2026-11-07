import React, { useState } from 'react';
import { Donor, BloodGroup } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Heart,
  AlertCircle
} from 'lucide-react';

interface DonorSearchProps {
  donors: Donor[];
}

export const DonorSearch: React.FC<DonorSearchProps> = ({ donors }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [contactDonorModal, setContactDonorModal] = useState<Donor | null>(null);
  const [patientReqDetails, setPatientReqDetails] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const filteredDonors = donors.filter((donor) => {
    const matchesBlood = selectedBloodGroup === 'ALL' || donor.bloodGroup === selectedBloodGroup;
    const matchesCity = selectedCity === 'ALL' || donor.city === selectedCity;
    const matchesAvail = !onlyAvailable || donor.isAvailable;
    const matchesSearch = searchQuery.trim() === '' || 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBlood && matchesCity && matchesAvail && matchesSearch;
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactDonorModal(null);
      setPatientReqDetails('');
    }, 2000);
  };

  const getLevelColor = (level: Donor['donorLevel']) => {
    switch (level) {
      case 'Platinum Champion':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold Guardian':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Silver LifeSaver':
        return 'bg-slate-200 text-slate-800 border-slate-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Verified Voluntary Donor Registry
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Find <span className="text-rose-400">Verified Voluntary Donors</span> Near You
          </h1>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Search through genuine, screened blood donors who have pledged to donate voluntarily.
            All donors have phone and medical eligibility pre-verification.
          </p>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by donor name, area (e.g. Indiranagar, Saket), or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Blood Groups Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-2">Blood Group Needed:</label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedBloodGroup('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedBloodGroup === 'ALL'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Groups
            </button>
            {BLOOD_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedBloodGroup(group)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBloodGroup === group
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* City and Availability Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 items-center">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Filter by City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ALL">All Cities</option>
              {CITIES.filter(c => c !== 'All Cities').map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="sm:pt-5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <span className="text-xs font-bold text-slate-700">
                Show Only Immediately Available Donors (Eligible Now)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Donors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDonors.map((donor) => {
          return (
            <div
              key={donor.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-300 transition-all hover:shadow-lg p-5 flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex flex-col items-center justify-center text-white shadow-sm shadow-rose-600/30">
                      <span className="text-lg font-black">{donor.bloodGroup}</span>
                      <span className="text-[8px] font-bold text-rose-200">TYPE</span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-1">
                        {donor.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {donor.gender}, {donor.age} yrs
                      </p>
                    </div>
                  </div>

                  {donor.isAvailable ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      Cooling
                    </span>
                  )}
                </div>

                {/* Level and Verification */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelColor(donor.donorLevel)}`}>
                    <Award className="w-3 h-3 inline mr-1" />
                    {donor.donorLevel}
                  </span>

                  {donor.isVerified && (
                    <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-sky-600" />
                      Govt ID Verified
                    </span>
                  )}
                </div>

                {/* Location and Info */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{donor.area}, <strong>{donor.city}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Donated <strong>{donor.totalDonations} times</strong> previously</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Status: <strong className={donor.isAvailable ? 'text-emerald-700' : 'text-amber-700'}>{donor.eligibleDate}</strong></span>
                  </div>
                </div>

                {donor.bio && (
                  <p className="mt-2.5 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg line-clamp-2">
                    "{donor.bio}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                {donor.privacyHidePhone ? (
                  <button
                    onClick={() => setContactDonorModal(donor)}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Request Contact (Masked)</span>
                  </button>
                ) : (
                  <>
                    <a
                      href={`tel:${donor.phone.replace(/\s+/g, '')}`}
                      className="w-1/2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Donor</span>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${donor.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                        `Hello ${donor.name}, I found your profile on LifePulse Blood Network. We urgently require ${donor.bloodGroup} blood for an emergency hospital case. Could you please let us know if you can donate?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Masked Contact Modal */}
      {contactDonorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <div className="flex items-center gap-3 text-slate-800 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Privacy Protected Donor</h3>
                <p className="text-xs text-slate-500">{contactDonorModal.name} ({contactDonorModal.bloodGroup})</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl">
              This donor has enabled privacy protection to prevent spam. LifePulse will dispatch a verified SMS & push alert with your case details directly to the donor.
            </p>

            {contactSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Emergency Alert Dispatched!</h4>
                <p className="text-xs text-slate-500 mt-1">The donor has received your emergency alert on their verified number.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Describe Patient Case & Hospital Bed:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Apollo Hospital ICU Bed 4, patient undergoing surgery, need 1 unit immediately. Contact: 98110XXXXX"
                    value={patientReqDetails}
                    onChange={(e) => setPatientReqDetails(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactDonorModal(null)}
                    className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition"
                  >
                    Send SOS to Donor
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
