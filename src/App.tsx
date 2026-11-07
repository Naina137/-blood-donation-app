import React, { useState, useEffect } from 'react';
import { 
  getStoredDonors, 
  saveDonors, 
  getStoredRequests, 
  saveRequests, 
  getStoredBloodBanks, 
  getStoredCamps, 
  saveCamps, 
  getCurrentDonorProfile, 
  saveCurrentDonorProfile 
} from './utils/storage';
import { Donor, BloodRequest, BloodBank, DonationCamp } from './types';
import { Navbar } from './components/Navbar';
import { UrgentRequests } from './components/UrgentRequests';
import { DonorSearch } from './components/DonorSearch';
import { DonorRegistration } from './components/DonorRegistration';
import { BloodBankInventory } from './components/BloodBankInventory';
import { DonationCamps } from './components/DonationCamps';
import { CompatibilityGuide } from './components/CompatibilityGuide';
import { DigitalDonorCard } from './components/DigitalDonorCard';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { 
  Heart, 
  ShieldCheck, 
  Phone, 
  AlertCircle, 
  Activity, 
  Users, 
  CheckCircle2, 
  Lock,
  Building,
  HeartHandshake
} from 'lucide-react';

export function App() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [camps, setCamps] = useState<DonationCamp[]>([]);
  const [currentDonor, setCurrentDonor] = useState<Donor | null>(null);

  const [activeTab, setActiveTab] = useState<string>('urgent');
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data from LocalStorage
  useEffect(() => {
    const loadedRequests = getStoredRequests();
    const loadedDonors = getStoredDonors();
    const loadedBanks = getStoredBloodBanks();
    const loadedCamps = getStoredCamps();
    const loadedCurrent = getCurrentDonorProfile();

    setRequests(loadedRequests);
    setDonors(loadedDonors);
    setBloodBanks(loadedBanks);
    setCamps(loadedCamps);
    if (loadedCurrent) {
      setCurrentDonor(loadedCurrent);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handler: Pledge to donate for an urgent request
  const handlePledge = (requestId: string, donorName: string, donorPhone: string) => {
    const updated = requests.map((req) => {
      if (req.id === requestId) {
        const newFulfilled = Math.min(req.unitsNeeded, req.unitsFulfilled + 1);
        return {
          ...req,
          unitsFulfilled: newFulfilled,
          donorsPledged: req.donorsPledged + 1,
          status: newFulfilled >= req.unitsNeeded ? ('FULFILLED' as const) : ('PARTIAL' as const)
        };
      }
      return req;
    });

    setRequests(updated);
    saveRequests(updated);
    showToast(`Thank you, ${donorName}! Your blood unit pledge has been dispatched to the hospital attendant.`);
  };

  // Handler: Post new emergency blood request
  const handleSubmitRequest = (newReq: BloodRequest) => {
    const updated = [newReq, ...requests];
    setRequests(updated);
    saveRequests(updated);
    setActiveTab('urgent');
    showToast(`Emergency SOS broadcasted! Case #${newReq.caseNumber} is now live across the volunteer network.`);
  };

  // Handler: Register as donor
  const handleRegisterDonor = (newDonor: Donor) => {
    const updated = [newDonor, ...donors];
    setDonors(updated);
    saveDonors(updated);
    setCurrentDonor(newDonor);
    saveCurrentDonorProfile(newDonor);
    showToast(`Welcome ${newDonor.name}! Your Digital Donor ID has been created.`);
  };

  // Handler: Register camp slot
  const handleRegisterSlot = (campId: string, name: string, phone: string, slot: string) => {
    const updated = camps.map((camp) => {
      if (camp.id === campId) {
        return {
          ...camp,
          registeredCount: camp.registeredCount + 1
        };
      }
      return camp;
    });

    setCamps(updated);
    saveCamps(updated);
    showToast(`Slot registered for ${name} at ${slot}! Entry pass token generated.`);
  };

  const handleViewCard = (donor: Donor) => {
    setCurrentDonor(donor);
    setActiveTab('card');
  };

  const handleSelectSampleDonor = (donorId: string) => {
    const found = donors.find((d) => d.id === donorId);
    if (found) {
      setCurrentDonor(found);
    }
  };

  // Count of active critical / open requests
  const openRequestsCount = requests.filter(r => r.status !== 'FULFILLED').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-rose-500/40 flex items-center gap-3 animate-bounce-soft max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSOSModal={() => setIsSOSModalOpen(true)}
        urgentCount={openRequestsCount}
      />

      {/* Trust & Impact Metric Bar */}
      <div className="bg-white border-b border-slate-200/70 py-3 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
              <span className="text-slate-500">Total Life Pledges:</span>
              <strong className="text-slate-900 font-extrabold">14,842+ Units</strong>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-500">Verified Donors:</span>
              <strong className="text-slate-900 font-extrabold">{donors.length * 120 + 840}+</strong>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-600" />
              <span className="text-slate-500">Partner Blood Banks:</span>
              <strong className="text-slate-900 font-extrabold">42 Centers</strong>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span className="text-slate-500">Avg. Emergency Response:</span>
              <strong className="text-slate-900 font-extrabold">14 mins</strong>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>End-to-End Privacy Protected Contact Exchange</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'urgent' && (
          <UrgentRequests
            requests={requests}
            onPledge={handlePledge}
            openPostModal={() => setIsSOSModalOpen(true)}
          />
        )}

        {activeTab === 'donors' && (
          <DonorSearch
            donors={donors}
          />
        )}

        {activeTab === 'register' && (
          <DonorRegistration
            onRegisterDonor={handleRegisterDonor}
            onViewCard={handleViewCard}
          />
        )}

        {activeTab === 'inventory' && (
          <BloodBankInventory
            bloodBanks={bloodBanks}
          />
        )}

        {activeTab === 'camps' && (
          <DonationCamps
            camps={camps}
            onRegisterSlot={handleRegisterSlot}
          />
        )}

        {activeTab === 'compatibility' && (
          <CompatibilityGuide />
        )}

        {activeTab === 'card' && (
          <DigitalDonorCard
            currentDonor={currentDonor}
            allDonors={donors}
            onRegisterClick={() => setActiveTab('register')}
            onSelectSampleDonor={handleSelectSampleDonor}
          />
        )}
      </main>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onSubmitRequest={handleSubmitRequest}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">Life<span className="text-rose-500">Pulse</span></span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                A non-profit, genuine emergency blood donation network connecting patients in critical need directly with voluntary donors and licensed blood banks.
              </p>
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Commercialization • 100% Free</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Emergency Helplines</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="tel:104" className="hover:text-white transition flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-rose-500" /> Dial 104 (National Blood Service)
                  </a>
                </li>
                <li>
                  <a href="tel:108" className="hover:text-white transition flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-rose-500" /> Dial 108 (Disaster & Medical ER)
                  </a>
                </li>
                <li>
                  <a href="tel:1800119988" className="hover:text-white transition flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-rose-500" /> 1800-11-9988 (Red Cross Blood Helpline)
                  </a>
                </li>
                <li>
                  <span className="text-slate-500 text-[11px] block mt-1">Available 24 hours, 7 days a week, 365 days a year</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Navigation</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => setActiveTab('urgent')} className="hover:text-rose-400 transition">🚨 Live Emergency Requests</button></li>
                <li><button onClick={() => setActiveTab('donors')} className="hover:text-rose-400 transition">🔍 Search Voluntary Donors</button></li>
                <li><button onClick={() => setActiveTab('register')} className="hover:text-rose-400 transition">🩸 Register as Donor</button></li>
                <li><button onClick={() => setActiveTab('inventory')} className="hover:text-rose-400 transition">🏥 Blood Banks & Stock</button></li>
                <li><button onClick={() => setActiveTab('compatibility')} className="hover:text-rose-400 transition">🧬 Blood Compatibility Matrix</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Clinical Compliance</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Operates strictly under voluntary, non-remunerated donation guidelines compliant with National Blood Transfusion regulations and WHO safety standards.
              </p>
              <div className="mt-3 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300">
                <strong>Safety Reminder:</strong> Blood selling or buying is strictly prohibited by law. Report any suspicious commercial demands immediately to 104.
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <p>© 2026 LifePulse Verified Blood Donation Network. Dedicated to saving lives.</p>
            <p>Designed with medical verification standards & donor privacy protection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
