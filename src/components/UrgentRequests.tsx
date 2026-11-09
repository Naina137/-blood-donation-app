import React, { useState } from 'react';
import { BloodRequest, BloodGroup } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Share2, 
  CheckCircle2, 
  Filter, 
  HeartHandshake, 
  Building2, 
  PlusCircle,
  Copy,
  Check
} from 'lucide-react';

interface UrgentRequestsProps {
  requests: BloodRequest[];
  onPledge: (requestId: string, donorName: string, donorPhone: string) => void;
  openPostModal: () => void;
}

export const UrgentRequests: React.FC<UrgentRequestsProps> = ({
  requests,
  onPledge,
  openPostModal
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('ALL');
  const [pledgeModalReq, setPledgeModalReq] = useState<BloodRequest | null>(null);
  const [pledgeName, setPledgeName] = useState('');
  const [pledgePhone, setPledgePhone] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRequests = requests.filter((req) => {
    const matchesBlood = selectedBloodGroup === 'ALL' || req.bloodGroup === selectedBloodGroup;
    const matchesCity = selectedCity === 'ALL' || req.city === selectedCity;
    const matchesUrgency = selectedUrgency === 'ALL' || req.urgency === selectedUrgency;
    return matchesBlood && matchesCity && matchesUrgency;
  });

  const handleShare = (req: BloodRequest) => {
    const text = `🚨 *URGENT BLOOD REQUIREMENT - LIFEFLOW VERIFIED* 🚨
Patient: ${req.patientName}
Blood Group: *${req.bloodGroup}* (${req.unitsNeeded - req.unitsFulfilled} units needed urgently)
Hospital: ${req.hospitalName}, ${req.city}
Doctor / Case: ${req.doctorName} (Case #${req.caseNumber})
Contact Person: ${req.contactPerson} (${req.contactPhone})
Reason: ${req.reason}
Verified Hospital Emergency. Please donate or forward immediately!`;

    navigator.clipboard.writeText(text);
    setCopiedId(req.id);
    setTimeout(() => setCopiedId(null), 2500);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeModalReq) return;
    if (!pledgeName.trim() || !pledgePhone.trim()) {
      alert('Please provide your name and phone number to notify hospital.');
      return;
    }
    onPledge(pledgeModalReq.id, pledgeName, pledgePhone);
    setPledgeModalReq(null);
    setPledgeName('');
    setPledgePhone('');
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Alert */}
      <div className="bg-gradient-to-br from-rose-900 via-red-800 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 px-3.5 py-1 rounded-full text-xs font-semibold text-rose-200 mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            Live Hospital SOS Feed • 100% Medical Records Verified
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Patients In Critical Need of <span className="text-rose-300 underline decoration-rose-400/50">Urgent Blood</span>
          </h1>
          <p className="mt-3 text-rose-100/90 text-sm sm:text-base leading-relaxed">
            Every minute counts in trauma, emergency surgeries, and Thalassemia transfusions.
            Directly connect with patient attendants or hospital blood banks with no middlemen.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={openPostModal}
              className="bg-white text-rose-800 hover:bg-rose-50 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md flex items-center gap-2 group"
            >
              <PlusCircle className="w-4 h-4 text-rose-600 group-hover:rotate-90 transition-transform" />
              Post Emergency Blood Request
            </button>
            <a
              href="tel:104"
              className="bg-rose-950/60 hover:bg-rose-950 border border-rose-700/60 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-rose-300" />
              National Blood Hotline (104)
            </a>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Filter className="w-4 h-4 text-rose-600" />
            <span>Filter Emergency Cases</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-rose-600">{filteredRequests.length}</strong> active emergency requests
          </span>
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
              All Types
            </button>
            {BLOOD_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedBloodGroup(group)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  selectedBloodGroup === group
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{group}</span>
              </button>
            ))}
          </div>
        </div>

        {/* City and Urgency Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">City / Region:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ALL">All Cities & States</option>
              {CITIES.filter(c => c !== 'All Cities').map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Urgency Level:</label>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ALL">All Urgency Levels</option>
              <option value="CRITICAL_IMMEDIATE">🚨 Critical (Next 2-4 Hours)</option>
              <option value="HIGH_24H">⚡ High Urgency (Within 24 Hours)</option>
              <option value="STANDARD_PLANNED">📅 Standard / Planned Transfusion</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No Pending Requests Found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            Great news! There are currently no urgent requests matching your filter criteria.
            Try resetting filters or post a new emergency request if someone you know needs blood.
          </p>
          <button
            onClick={() => { setSelectedBloodGroup('ALL'); setSelectedCity('ALL'); setSelectedUrgency('ALL'); }}
            className="mt-4 text-xs font-bold text-rose-600 hover:text-rose-700 underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredRequests.map((req) => {
            const isCritical = req.urgency === 'CRITICAL_IMMEDIATE';
            const isFulfilled = req.unitsFulfilled >= req.unitsNeeded;
            const unitsRemaining = Math.max(0, req.unitsNeeded - req.unitsFulfilled);
            const progressPercent = Math.min(100, Math.round((req.unitsFulfilled / req.unitsNeeded) * 100));

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border transition-all hover:shadow-lg overflow-hidden flex flex-col justify-between ${
                  isCritical
                    ? 'border-red-300 shadow-sm shadow-red-100 ring-1 ring-red-400/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Header & Badges */}
                <div className="p-5 sm:p-6 pb-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full animate-pulse shadow-sm shadow-red-500/50">
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                          CRITICAL: NEEDED NOW
                        </span>
                      ) : req.urgency === 'HIGH_24H' ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          NEEDED WITHIN 24H
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          PLANNED SCHEDULED
                        </span>
                      )}

                      {req.verifiedHospital && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified Hospital Case
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" /> {req.createdAt}
                    </span>
                  </div>

                  {/* Main Patient & Blood Details */}
                  <div className="flex items-start gap-4">
                    {/* Big Blood Badge */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-rose-600 to-red-700 flex flex-col items-center justify-center text-white shadow-md shadow-rose-600/20">
                        <span className="text-xl font-black tracking-tight">{req.bloodGroup}</span>
                        <span className="text-[9px] uppercase font-bold text-rose-200 tracking-wider">Required</span>
                      </div>
                      <span className="mt-1 text-[10px] font-bold text-slate-500">
                        {req.unitsNeeded} {req.unitsNeeded === 1 ? 'Unit' : 'Units'}
                      </span>
                    </div>

                    {/* Patient & Hospital Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug truncate">
                        {req.patientName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold mt-0.5">
                        <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                          {req.reason}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 font-medium">Case #{req.caseNumber}</span>
                      </div>

                      <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                        <div className="flex items-start gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-800">{req.hospitalName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{req.hospitalAddress}, <strong>{req.city}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Attending: <strong>{req.doctorName}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Urgent remark */}
                  {req.notes && (
                    <div className="mt-3.5 bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 border border-slate-100">
                      <strong className="text-slate-700 font-semibold">Medical Note:</strong> {req.notes}
                    </div>
                  )}

                  {/* Progress Bar of Units */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-slate-700">
                        Fulfillment Status: {req.unitsFulfilled} of {req.unitsNeeded} units confirmed
                      </span>
                      <span className={`font-bold ${isFulfilled ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {unitsRemaining === 0 ? 'Fully Covered' : `${unitsRemaining} More Needed`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isFulfilled ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-600'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-50/80 px-5 py-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="text-xs">
                    <span className="text-slate-500">Contact: </span>
                    <strong className="text-slate-800">{req.contactPerson}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(req)}
                      className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-xs"
                      title="Share to WhatsApp & Copy SOS Link"
                    >
                      {copiedId === req.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Shared!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Share SOS</span>
                        </>
                      )}
                    </button>

                    {/* Direct Call Button */}
                    <a
                      href={`tel:${(req.contactPhone || '').replace(/\s+/g, '')}`}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Attendant</span>
                    </a>

                    {/* Pledge Donation Button */}
                    {!isFulfilled ? (
                      <button
                        onClick={() => setPledgeModalReq(req)}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm shadow-rose-600/30 transition flex items-center gap-1.5"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>I Can Donate</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pledge Modal */}
      {pledgeModalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Pledge Blood Unit</h3>
                <p className="text-xs text-slate-500">You are saving a life today!</p>
              </div>
            </div>

            <div className="bg-rose-50 rounded-2xl p-3.5 mb-4 text-xs text-rose-900 border border-rose-100">
              <p><strong>Patient:</strong> {pledgeModalReq.patientName}</p>
              <p><strong>Required Group:</strong> <span className="font-black text-rose-700">{pledgeModalReq.bloodGroup}</span></p>
              <p><strong>Hospital:</strong> {pledgeModalReq.hospitalName}, {pledgeModalReq.city}</p>
            </div>

            <form onSubmit={handleConfirmPledge} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Mobile Number:</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={pledgePhone}
                  onChange={(e) => setPledgePhone(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">This will only be shared with the patient attendant to coordinate donation.</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-900 border border-amber-200">
                ⚠️ <strong>Clinical Note:</strong> Please ensure you are between 18-65 years, weight ≥ 50kg, and have not donated blood in the last 90 days.
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setPledgeModalReq(null)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition"
                >
                  Confirm Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
