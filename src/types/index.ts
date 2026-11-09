export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UrgencyLevel = 'CRITICAL_IMMEDIATE' | 'HIGH_24H' | 'STANDARD_PLANNED';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  city: string;
  area: string;
  pincode: string;
  isAvailable: boolean;
  lastDonationDate: string; // YYYY-MM-DD or 'Never'
  totalDonations: number;
  isVerified: boolean;
  verificationBadgeType: 'GOVERNMENT_ID' | 'HOSPITAL_DONOR' | 'COMMUNITY_VERIFIED';
  privacyHidePhone: boolean;
  donorLevel: 'Bronze Supporter' | 'Silver LifeSaver' | 'Gold Guardian' | 'Platinum Champion';
  eligibleDate: string; // When can donate next
  bio?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  unitsFulfilled: number;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  doctorName: string;
  caseNumber: string;
  urgency: UrgencyLevel;
  contactPerson: string;
  contactPhone: string;
  relation: string;
  reason: 'Accident / Trauma' | 'Emergency Surgery' | 'Thalassemia' | 'Cancer / Chemotherapy' | 'Childbirth / Postpartum' | 'Dengue / Low Platelets' | 'Cardiac Bypass' | 'Other Medical Emergency';
  verifiedHospital: boolean;
  status: 'OPEN' | 'PARTIAL' | 'FULFILLED';
  createdAt: string;
  requiredBy: string;
  donorsPledged: number;
  notes?: string;
}

export interface BloodBank {
  id: string;
  name: string;
  type: 'Government Medical Center' | 'Red Cross Society' | 'Charitable Trust' | 'Hospital Attached';
  address: string;
  city: string;
  phone: string;
  helpline24x7: string;
  stock: Record<BloodGroup, number>; // units available
  operatingHours: string;
  distanceKm: number;
  licenseNumber: string;
  hasPlateletsApheresis: boolean;
  hasCryoprecipitate: boolean;
  ambulanceAvailable: boolean;
}

export interface DonationCamp {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  expectedDonors: number;
  registeredCount: number;
  targetUnits: number;
  contactPhone: string;
  amenities: string[];
}

export interface EligibilityAnswers {
  ageValid: boolean;        // 18 - 65
  weightValid: boolean;     // >= 50kg (110 lbs)
  hemoglobinValid: boolean; // >= 12.5 g/dL
  noRecentTattoo: boolean;  // No tattoo or piercing in last 6 months
  noRecentSurgery: boolean; // No major surgery in last 6 months
  noInfection: boolean;     // No fever/cold/antibiotics in last 14 days
  alcoholFree: boolean;     // No alcohol consumed in last 24 hours
  donationInterval: boolean;// At least 90 days (men) or 120 days (women) since last donation
}
