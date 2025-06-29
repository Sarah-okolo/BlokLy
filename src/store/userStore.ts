import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Space {
  id: string;
  name: string;
  domain: string;
  created_at: string;
  plan: string;
}

export interface SiteDetails {
  name?: string;
  description?: string;
  theme: 'light' | 'dark' | 'custom';
  codeRepo?: string;
  selectedSpaces: Space[];
}

interface UserState {
  isConnected: boolean;
  userSpaces: Space[];
  siteDetails: SiteDetails;
  currentStep: 'landing' | 'spaces' | 'details' | 'creating' | 'success';
  createdSite?: {
    id: string;
    url: string;
    name: string;
  };
  
  // Actions
  setConnected: (connected: boolean) => void;
  setUserSpaces: (spaces: Space[]) => void;
  setSiteDetails: (details: Partial<SiteDetails>) => void;
  setCurrentStep: (step: UserState['currentStep']) => void;
  setCreatedSite: (site: UserState['createdSite']) => void;
  resetFlow: () => void;
}

const initialSiteDetails: SiteDetails = {
  theme: 'light',
  selectedSpaces: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isConnected: false,
      userSpaces: [],
      siteDetails: initialSiteDetails,
      currentStep: 'landing',
      createdSite: undefined,
      
      setConnected: (connected) => set({ isConnected: connected }),
      setUserSpaces: (spaces) => set({ userSpaces: spaces }),
      setSiteDetails: (details) => 
        set((state) => ({ 
          siteDetails: { ...state.siteDetails, ...details } 
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setCreatedSite: (site) => set({ createdSite: site }),
      resetFlow: () => set({ 
        currentStep: 'spaces',
        siteDetails: initialSiteDetails,
        createdSite: undefined 
      }),
    }),
    {
      name: 'storyblok-user-storage',
      partialize: (state) => ({ 
        isConnected: state.isConnected,
        userSpaces: state.userSpaces 
      }),
    }
  )
);