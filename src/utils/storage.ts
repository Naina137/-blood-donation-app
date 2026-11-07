import { Donor, BloodRequest, BloodBank, DonationCamp } from '../types';
import { INITIAL_DONORS, INITIAL_REQUESTS, INITIAL_BLOOD_BANKS, INITIAL_CAMPS } from '../data/mockData';

const DONORS_KEY = 'lifeflow_donors';
const REQUESTS_KEY = 'lifeflow_requests';
const BLOOD_BANKS_KEY = 'lifeflow_blood_banks';
const CAMPS_KEY = 'lifeflow_camps';
const CURRENT_USER_DONOR_KEY = 'lifeflow_current_donor';

export const getStoredDonors = (): Donor[] => {
  try {
    const data = localStorage.getItem(DONORS_KEY);
    return data ? JSON.parse(data) : INITIAL_DONORS;
  } catch {
    return INITIAL_DONORS;
  }
};

export const saveDonors = (donors: Donor[]) => {
  try {
    localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
  } catch (e) {
    console.error('Failed to save donors to localStorage', e);
  }
};

export const getStoredRequests = (): BloodRequest[] => {
  try {
    const data = localStorage.getItem(REQUESTS_KEY);
    return data ? JSON.parse(data) : INITIAL_REQUESTS;
  } catch {
    return INITIAL_REQUESTS;
  }
};

export const saveRequests = (requests: BloodRequest[]) => {
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch (e) {
    console.error('Failed to save requests to localStorage', e);
  }
};

export const getStoredBloodBanks = (): BloodBank[] => {
  try {
    const data = localStorage.getItem(BLOOD_BANKS_KEY);
    return data ? JSON.parse(data) : INITIAL_BLOOD_BANKS;
  } catch {
    return INITIAL_BLOOD_BANKS;
  }
};

export const saveBloodBanks = (banks: BloodBank[]) => {
  try {
    localStorage.setItem(BLOOD_BANKS_KEY, JSON.stringify(banks));
  } catch (e) {
    console.error('Failed to save blood banks', e);
  }
};

export const getStoredCamps = (): DonationCamp[] => {
  try {
    const data = localStorage.getItem(CAMPS_KEY);
    return data ? JSON.parse(data) : INITIAL_CAMPS;
  } catch {
    return INITIAL_CAMPS;
  }
};

export const saveCamps = (camps: DonationCamp[]) => {
  try {
    localStorage.setItem(CAMPS_KEY, JSON.stringify(camps));
  } catch (e) {
    console.error('Failed to save camps', e);
  }
};

export const getCurrentDonorProfile = (): Donor | null => {
  try {
    const data = localStorage.getItem(CURRENT_USER_DONOR_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveCurrentDonorProfile = (donor: Donor) => {
  try {
    localStorage.setItem(CURRENT_USER_DONOR_KEY, JSON.stringify(donor));
  } catch (e) {
    console.error('Failed to save current donor profile', e);
  }
};
