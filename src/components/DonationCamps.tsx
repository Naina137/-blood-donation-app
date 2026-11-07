import React, { useState } from 'react';
import { DonationCamp } from '../types';
import { CITIES } from '../data/mockData';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  Phone, 
  Sparkles,
  Ticket,
  ChevronRight
} from 'lucide-react';

interface DonationCampsProps {
  camps: DonationCamp[];
  onRegisterSlot: (campId: string, name: string, phone: string, slot: string) => void;
}

export const DonationCamps: React.FC<DonationCampsProps> = ({ camps, onRegisterSlot }) => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedCamp, setSelectedCamp] = useState<DonationCamp | null>(null);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:30 AM');
  const [bookedPass, setBookedPass] = useState<{ camp: DonationCamp; slot: string; name: string } | null>(null);

  const filteredCamps = camps.filter((camp) => {
    return selectedCity === 'ALL' || camp.city === selectedCity;
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCamp) return;
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please fill out name and phone.');
      return;
    }
    onRegisterSlot(selectedCamp.id, regName, regPhone, selectedSlot);
    setBookedPass({ camp: selectedCamp, slot: selectedSlot, name: regName });
    setSelectedCamp(null);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-800 via-rose-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            Voluntary Donation Drives 2026
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Upcoming <span className="text-rose-300">Blood Donation Camps</span>
          </h1>
          <p className="mt-2 text-rose-100 text-xs sm:text-sm leading-relaxed">
            Donate in a safe, hygienic environment managed by certified medical teams. Book a priority slot to avoid waiting in queues.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Select City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="ALL">All Cities</option>
            {CITIES.filter(c => c !== 'All Cities').map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {filteredCamps.length} camps scheduled
        </span>
      </div>

      {/* Camp List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredCamps.map((camp) => {
          const percent = Math.min(100, Math.round((camp.registeredCount / camp.targetUnits) * 100));

          return (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    {camp.city}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {camp.registeredCount} Donors Registered
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">{camp.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Organized by: <strong className="text-slate-800">{camp.organizer}</strong></p>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
                    <strong>{camp.date}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{camp.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{camp.venue}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">What's Provided:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {camp.amenities.map((item, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Target Progress */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Target: {camp.targetUnits} Units</span>
                    <span>{percent}% Goal Reached</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-red-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${camp.contactPhone}`}
                  className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 hover:text-slate-900"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{camp.contactPhone}</span>
                </a>

                <button
                  onClick={() => setSelectedCamp(camp)}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book Slot & Pass</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Slot Modal */}
      {selectedCamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Book Donation Time Slot</h3>
            <p className="text-xs text-slate-500 mb-3">{selectedCamp.title}</p>

            <form onSubmit={handleBooking} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Roy"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number:</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Time Window:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="9:00 AM - 10:30 AM">9:00 AM – 10:30 AM</option>
                  <option value="10:30 AM - 12:00 PM">10:30 AM – 12:00 PM</option>
                  <option value="12:00 PM - 1:30 PM">12:00 PM – 1:30 PM</option>
                  <option value="2:00 PM - 3:30 PM">2:00 PM – 3:30 PM</option>
                  <option value="3:30 PM - 5:00 PM">3:30 PM – 5:00 PM</option>
                </select>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCamp(null)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booked Entry Pass Modal */}
      {bookedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Slot Confirmed!</h3>
              <p className="text-xs text-slate-500">Your priority entry pass for the blood camp</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
              <p><strong>Attendee:</strong> {bookedPass.name}</p>
              <p><strong>Drive:</strong> {bookedPass.camp.title}</p>
              <p><strong>Venue:</strong> {bookedPass.camp.venue}</p>
              <p><strong>Date & Time:</strong> {bookedPass.camp.date} ({bookedPass.slot})</p>
              <p><strong>Pass Token:</strong> <span className="font-mono font-bold text-rose-600">PASS-{Math.floor(100000 + Math.random() * 900000)}</span></p>
            </div>

            <button
              onClick={() => setBookedPass(null)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
            >
              Done & Save Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
