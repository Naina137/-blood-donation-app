import React, { useState } from 'react';
import { BloodGroup } from '../types';
import { BLOOD_GROUPS, COMPATIBILITY_MATRIX } from '../data/mockData';
import { 
  Activity, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Coffee, 
  Droplet,
  Info
} from 'lucide-react';

export const CompatibilityGuide: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<BloodGroup>('O-');

  const compatibility = COMPATIBILITY_MATRIX[activeGroup];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" />
            Clinical Transfusion Science
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Interactive <span className="text-rose-400">Blood Compatibility Matrix</span>
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Discover who can receive your blood type and who you can safely receive from. Understand antigen compatibility (ABO & Rh factor).
          </p>
        </div>
      </div>

      {/* Interactive Matrix Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">1. Select Your Blood Group</h2>
          <p className="text-xs text-slate-500 mt-0.5">Click any blood type below to view its biological matching profile</p>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 mt-4">
            {BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                onClick={() => setActiveGroup(bg)}
                className={`py-3 rounded-2xl font-black text-base sm:text-lg transition flex flex-col items-center justify-center border ${
                  activeGroup === bg
                    ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-600/30 scale-105'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{bg}</span>
                <span className="text-[9px] font-normal uppercase tracking-wider opacity-80">
                  {bg === 'O-' ? 'Universal' : bg === 'AB+' ? 'Recipient' : 'Type'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {/* Can Give Blood To */}
          <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center text-sm font-black">
                ⬆️
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  <span className="text-rose-700">{activeGroup}</span> Can Give Red Blood Cells To:
                </h3>
                <p className="text-[11px] text-slate-500">Recipients whose immune systems will safely accept this type</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {BLOOD_GROUPS.map((bg) => {
                const canGive = compatibility.canGiveTo.includes(bg);
                return (
                  <div
                    key={bg}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      canGive
                        ? 'bg-white border-emerald-400 text-emerald-800 font-extrabold shadow-xs'
                        : 'bg-slate-100/70 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <span className="text-sm">{bg}</span>
                    <span className="block text-[9px] mt-0.5 font-bold">
                      {canGive ? '✓ Compatible' : '✕ Incompatible'}
                    </span>
                  </div>
                );
              })}
            </div>

            {activeGroup === 'O-' && (
              <div className="mt-4 bg-emerald-100 text-emerald-900 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Universal Red Blood Cell Donor:</strong> O Negative blood can be transfused to emergency patients of ANY blood group!</span>
              </div>
            )}
          </div>

          {/* Can Receive Blood From */}
          <div className="bg-sky-50/60 rounded-2xl p-5 border border-sky-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm font-black">
                ⬇️
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  <span className="text-sky-700">{activeGroup}</span> Can Receive Blood From:
                </h3>
                <p className="text-[11px] text-slate-500">Safe compatible donors if {activeGroup} needs a transfusion</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {BLOOD_GROUPS.map((bg) => {
                const canReceive = compatibility.canReceiveFrom.includes(bg);
                return (
                  <div
                    key={bg}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      canReceive
                        ? 'bg-white border-emerald-400 text-emerald-800 font-extrabold shadow-xs'
                        : 'bg-slate-100/70 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <span className="text-sm">{bg}</span>
                    <span className="block text-[9px] mt-0.5 font-bold">
                      {canReceive ? '✓ Safe' : '✕ Incompatible'}
                    </span>
                  </div>
                );
              })}
            </div>

            {activeGroup === 'AB+' && (
              <div className="mt-4 bg-sky-100 text-sky-900 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span><strong>Universal Recipient:</strong> AB Positive individuals can safely receive red blood cells from all blood groups!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Steps of Safe Donation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-lg font-black text-slate-900">The 4 Simple Stages of Whole Blood Donation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-mono font-bold text-rose-600">STAGE 01</span>
            <h4 className="font-bold text-slate-900 text-sm mt-1">Registration (5 mins)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Verify Government ID, residential details, and complete donor consent questionnaire.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-mono font-bold text-rose-600">STAGE 02</span>
            <h4 className="font-bold text-slate-900 text-sm mt-1">Health Screening (8 mins)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Quick finger prick test checks hemoglobin (≥ 12.5 g/dL), blood pressure, pulse, and temperature.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-mono font-bold text-rose-600">STAGE 03</span>
            <h4 className="font-bold text-slate-900 text-sm mt-1">The Donation (8-10 mins)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Relax on a sterile donor couch while ~350-450ml is drawn using sterile single-use equipment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-mono font-bold text-rose-600">STAGE 04</span>
            <h4 className="font-bold text-slate-900 text-sm mt-1">Rest & Refreshment (15 mins)</h4>
            <p className="text-xs text-slate-500 mt-1">
              Enjoy juice, biscuits, and hydration. Plasma volume replenishes fully within 24 to 48 hours!
            </p>
          </div>
        </div>
      </div>

      {/* Myths vs Facts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900">Common Myths vs Scientific Facts</h2>
        <div className="space-y-3">
          {[
            {
              myth: 'Donating blood will make me weak and prone to illness.',
              fact: 'False. Only 350-450ml (about 8% of total blood) is taken. Your bone marrow produces fresh cells immediately, rejuvenating your blood supply.'
            },
            {
              myth: 'I could get an infection or disease while donating blood.',
              fact: 'Impossible. In licensed blood banks, all needles and blood bags are 100% sterile, factory-sealed, single-use, and incinerated right after.'
            },
            {
              myth: 'Vegetarians or people on birth control cannot donate blood.',
              fact: 'False. Diet has no restriction as long as hemoglobin is ≥ 12.5 g/dL. Most birth control pills do not disqualify you.'
            },
            {
              myth: 'It takes weeks for your body to recover blood.',
              fact: 'Plasma fluid volume is restored within 24 to 48 hours. Red blood cells replace completely within 4 to 6 weeks.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>MYTH: {item.myth}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-800 text-xs font-medium pl-6 pt-0.5">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span><strong>FACT:</strong> {item.fact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
