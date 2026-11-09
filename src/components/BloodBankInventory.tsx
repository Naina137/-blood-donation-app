import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Truck, 
  ShieldCheck,
  Search,
  Layers
} from 'lucide-react';

interface BloodBankInventoryProps {
  bloodBanks: BloodBank[];
}

export const BloodBankInventory: React.FC<BloodBankInventoryProps> = ({ bloodBanks }) => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');

  const filteredBanks = bloodBanks.filter((bank) => {
    const matchesCity = selectedCity === 'ALL' || bank.city === selectedCity;
    return matchesCity;
  });

  const getStockBadge = (count: number) => {
    if (count <= 3) {
      return (
        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-300 animate-pulse">
          Critical ({count})
        </span>
      );
    }
    if (count <= 10) {
      return (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
          Low ({count})
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
        Adequate ({count})
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Verified Government & Red Cross Blood Banks
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Live <span className="text-rose-400">Blood Bank Inventory</span> & Stock Tracker
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Monitor real-time availability of whole blood units, platelets, and cryoprecipitate across licensed medical blood banks.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Filter by City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ALL">All Cities</option>
              {CITIES.filter(c => c !== 'All Cities').map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Highlight Blood Group:</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ALL">All Groups</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>&gt;10 Units (Adequate)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>4-10 Units (Low)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-red-600 font-bold">&le;3 Units (Critical)</span>
          </div>
        </div>
      </div>

      {/* Blood Banks Cards */}
      <div className="space-y-5">
        {filteredBanks.map((bank) => {
          return (
            <div
              key={bank.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                      {bank.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      License: {bank.licenseNumber}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{bank.name}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {bank.address}, <strong>{bank.city}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {bank.operatingHours}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={`tel:${bank.phone}`}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: {bank.phone}</span>
                  </a>
                  <a
                    href={`tel:${bank.helpline24x7}`}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-200" />
                    <span>24x7 SOS: {bank.helpline24x7}</span>
                  </a>
                </div>
              </div>

              {/* Special Facilities */}
              <div className="py-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-bold text-slate-700">Facilities Available:</span>
                {bank.hasPlateletsApheresis && (
                  <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1">
                    <Activity className="w-3 h-3 text-rose-600" /> Apheresis Single Donor Platelets (SDP)
                  </span>
                )}
                {bank.hasCryoprecipitate && (
                  <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1">
                    <Layers className="w-3 h-3 text-sky-600" /> Cryoprecipitate
                  </span>
                )}
                {bank.ambulanceAvailable && (
                  <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-medium flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-600" /> Emergency Blood Transport Vehicle
                  </span>
                )}
              </div>

              {/* Real-Time Stock Grid */}
              <div className="pt-3">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2.5">
                  Available Whole Blood Units by Group:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                  {BLOOD_GROUPS.map((bg) => {
                    const count = bank.stock[bg] || 0;
                    const isHighlighted = selectedGroup === bg;
                    return (
                      <div
                        key={bg}
                        className={`rounded-xl p-2.5 text-center border transition ${
                          isHighlighted
                            ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/30'
                            : 'bg-slate-50/80 border-slate-200'
                        }`}
                      >
                        <div className="text-sm font-black text-slate-900">{bg}</div>
                        <div className="text-base font-extrabold text-rose-600 my-0.5">{count} <span className="text-[10px] text-slate-400 font-normal">units</span></div>
                        <div className="mt-1">{getStockBadge(count)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
