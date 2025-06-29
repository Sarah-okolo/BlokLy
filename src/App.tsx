import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { StickyHeader } from '@/components/StickyHeader';
import { LandingPage } from '@/pages/LandingPage';
import { SpacesSelector } from '@/components/SpacesSelector';
import { SiteDetailsForm } from '@/components/SiteDetailsForm';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SiteSuccessScreen } from '@/components/SiteSuccessScreen';
import { useUserStore } from '@/store/userStore';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { isConnected, currentStep } = useUserStore();

  const renderCurrentStep = () => {
    if (!isConnected) {
      return <LandingPage />;
    }

    switch (currentStep) {
      case 'spaces':
        return <SpacesSelector />;
      case 'details':
        return <SiteDetailsForm />;
      case 'creating':
        return <LoadingScreen />;
      case 'success':
        return <SiteSuccessScreen />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-screen">
      <StickyHeader />
      <main className="mx-auto overflow-x-hidden">
        {renderCurrentStep()}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;