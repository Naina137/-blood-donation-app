import React, { useState } from 'react';
import { BloodRequest, BloodGroup, UrgencyLevel } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';
import { 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  Send, 
  Building2, 
  Phone, 
  FileText, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (newReq: BloodRequest) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+' as BloodGroup,
    unitsNeeded: 2,
    hospitalName: '',
    hospitalAddress: '',
    city: 'Delhi NCR',
    doctorName: '',
    caseNumber: '',
    urgency: 'CRITICAL_IMMEDIATE' as UrgencyLevel,
    contactPerson: '',
    contactPhone: '',
    relation: 'Family Attendant',
    reason: 'Accident / Trauma' as BloodRequest['reason'],
    notes: '',
    affirmed: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim() || !formData.hospitalName.trim() || !formData.contactPhone.trim()) {
      alert('Please fill out all required medical details.');
      return;
    }
    if (!formData.affirmed) {
      alert('Please confirm that this is a genuine emergency requirement.');
      return;
    }

    const uniqueCase = formData.caseNumber || `EMG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq: BloodRequest = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      patientName: formData.patientName,
      bloodGroup: formData.bloodGroup,
      unitsNeeded: Number(formData.unitsNeeded),
      unitsFulfilled: 0,
      hospitalName: formData.hospitalName,
      hospitalAddress: formData.hospitalAddress || 'Hospital Main Campus',
      city: formData.city,
      doctorName: formData.doctorName || 'Attending ER Physician',
      caseNumber: uniqueCase,
      urgency: formData.urgency,
      contactPerson: formData.contactPerson || 'Patient Attendant',
      contactPhone: formData.contactPhone,
      relation: formData.relation,
      reason: formData.reason,
      verifiedHospital: true,
      status: 'OPEN',
      createdAt: 'Just now',
      requiredBy: formData.urgency === 'CRITICAL_IMMEDIATE' ? 'Immediate (< 2 Hours)' : 'Within 24 Hours',
      donorsPledged: 0,
      notes: formData.notes
    };

    onSubmitRequest(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-200 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-500/30">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Post Urgent Blood SOS Request
              </h2>
              <p className="text-xs text-rose-600 font-bold">
                Broadcast directly to voluntary donors and partner hospital networks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="mt-4 bg-rose-50 border border-rose-200 rounded-2xl p-3 text-xs text-rose-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>
            <strong>Authenticity Protocol:</strong> LifePulse only hosts genuine, verified medical emergencies.
            Attendant phone numbers are verified, and fake broadcasts are reported to authorities.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Patient Name & Blood Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Patient Name & Age <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma (Age 34)"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Blood Group <span className="text-red-500">*</span>:
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                className="w-full text-xs sm:text-sm font-black bg-rose-50 border border-rose-300 text-rose-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Units Needed & Urgency Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Units Needed (Pints / Bags) <span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                required
                value={formData.unitsNeeded}
                onChange={(e) => setFormData({ ...formData, unitsNeeded: Number(e.target.value) })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Emergency Urgency Level <span className="text-red-500">*</span>:
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value as UrgencyLevel })}
                className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="CRITICAL_IMMEDIATE">🚨 Critical Immediate (Next 2-4 Hours)</option>
                <option value="HIGH_24H">⚡ High Urgency (Within 24 Hours)</option>
                <option value="STANDARD_PLANNED">📅 Planned / Scheduled Surgery</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Medical Reason / Condition:</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Accident / Trauma">Accident / Road Trauma</option>
              <option value="Emergency Surgery">Emergency Surgery / ICU</option>
              <option value="Thalassemia">Thalassemia Major Transfusion</option>
              <option value="Childbirth / Postpartum">Childbirth / Postpartum Hemorrhage</option>
              <option value="Cancer / Chemotherapy">Cancer / Chemotherapy Platelet Drop</option>
              <option value="Dengue / Low Platelets">Dengue / Platelet Crash</option>
              <option value="Cardiac Bypass">Cardiac Bypass / Open Heart</option>
              <option value="Other Medical Emergency">Other Medical Emergency</option>
            </select>
          </div>

          {/* Hospital Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Hospital Name & Bed/Ward <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AIIMS Trauma Center (ICU 4)"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Doctor Name / Department:</label>
              <input
                type="text"
                placeholder="e.g. Dr. R. K. Sharma (Surgeon)"
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Hospital IPD / Case Number:</label>
              <input
                type="text"
                placeholder="e.g. IPD-98120 (for verification)"
                value={formData.caseNumber}
                onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Contact Person Name (Attendant) <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sunita Sharma (Mother)"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Attendant Mobile Number <span className="text-red-500">*</span>:
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98712 34567"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Additional Clinical Instructions / Notes:</label>
            <textarea
              rows={2}
              placeholder="e.g. Please bring whole blood replacement slip issued by AIIMS Blood Bank counter 3."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Genuine Affirmation Checkbox */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.affirmed}
                onChange={(e) => setFormData({ ...formData, affirmed: e.target.checked })}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 mt-0.5 focus:ring-rose-500"
              />
              <span className="text-xs text-slate-700">
                I solemnly certify that this blood requirement is for an active admitted patient, and all medical details provided are accurate.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-3 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Emergency SOS Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
