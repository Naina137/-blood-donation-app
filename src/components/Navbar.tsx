import React from 'react';
import { Heart, AlertCircle, Phone, Search, UserPlus, Building2, Calendar, FileText, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSOSModal: () => void;
  urgentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSOSModal,
  urgentCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      {/* 24/7 Emergency Hotline Ticker */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-rose-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-ping"></span>
            <span className="text-rose-200">24x7 Emergency Blood Assistance Line:</span>
            <a href="tel:104" className="bg-rose-800/80 hover:bg-rose-700 text-white font-bold px-2 py-0.5 rounded text-xs transition inline-flex items-center gap-1">
              <Phone className="w-3 h-3 text-rose-300" /> Dial 104 (National Toll-Free)
            </a>
            <span className="hidden sm:inline text-rose-400">|</span>
            <span className="hidden sm:inline text-rose-300">Red Cross Helpline: 1800-11-9988</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-rose-300">
            <span className="hidden md:inline">✓ 100% Verified Hospital Cases</span>
            <span className="hidden lg:inline">✓ Privacy-Protected Contacts</span>
            <span className="bg-rose-500/20 text-rose-200 font-semibold px-2 py-0.5 rounded border border-rose-500/30">
              Zero Commercialization • Non-Profit
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand */}
          <div 
            onClick={() => setActiveTab('urgent')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white animate-heartbeat" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">Life<span className="text-rose-600">Pulse</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Real-Time Blood & Platelet Network</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('urgent')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'urgent'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <AlertCircle className={`w-4 h-4 ${activeTab === 'urgent' ? 'text-rose-600' : 'text-slate-400'}`} />
              Urgent Requests
              {urgentCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                  {urgentCount} SOS
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('donors')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'donors'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              Find Donors
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <UserPlus className="w-4 h-4 text-slate-400" />
              Register as Donor
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              Blood Banks
            </button>

            <button
              onClick={() => setActiveTab('camps')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'camps'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              Drives & Camps
            </button>

            <button
              onClick={() => setActiveTab('compatibility')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'compatibility'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4 text-slate-400" />
              Compatibility Matrix
            </button>

            <button
              onClick={() => setActiveTab('card')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === 'card'
                  ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Donor ID Card
            </button>
          </nav>

          {/* Emergency SOS Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={openSOSModal}
              className="bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all flex items-center gap-2 group text-sm animate-pulse-subtle"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <span>Post Emergency SOS</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scroll */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100">
          <button
            onClick={() => setActiveTab('urgent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'urgent' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🚨 Urgent Requests ({urgentCount})
          </button>
          <button
            onClick={() => setActiveTab('donors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'donors' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🔍 Find Donors
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'register' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            ➕ Register
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'inventory' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🏥 Blood Banks
          </button>
          <button
            onClick={() => setActiveTab('camps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'camps' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            📅 Camps
          </button>
          <button
            onClick={() => setActiveTab('compatibility')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'compatibility' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🧬 Compatibility
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'card' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🪪 Donor Card
          </button>
        </div>
      </div>
    </header>
  );
};
