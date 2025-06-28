import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';

interface CreateSitePayload {
  spaces: string[];
  name?: string;
  description?: string;
  theme: 'light' | 'dark' | 'custom';
  codeRepo?: string;
}

interface CreateSiteResponse {
  id: string;
  url: string;
  name: string;
}

export const useCreateSite = () => {
  const { setCurrentStep, setCreatedSite } = useUserStore();
  
  return useMutation({
    mutationFn: async (payload: CreateSitePayload) => {
      console.log('Creating site with payload:', payload);
      setCurrentStep('creating');
      const response = await axiosInstance.post<CreateSiteResponse>('/projects', payload);
      return response.data;
    },
    onSuccess: (data) => {
      setCreatedSite(data);
      setCurrentStep('success');
      toast.success('🌟 Site created successfully!', {
        description: `Your site "${data.name}" is now live.`,
      });
    },
    onError: (error: any) => {
      setCurrentStep('details');
      toast.error('❌ Site creation failed', {
        description: error.response?.data?.message || 'Something went wrong while creating your site.',
      });
    }
  });
};

export const useConnectEditor = () => {
  return useMutation({
    mutationFn: async (siteId: string) => {
      const response = await axiosInstance.post('/sites/connect-editor', { siteId });
      return response.data;
    },
    onSuccess: () => {
      toast.success('🔗 Visual Editor connected!', {
        description: 'You can now edit your site visually.',
      });
    },
    onError: (error: any) => {
      toast.error('❌ Editor connection failed', {
        description: error.response?.data?.message || 'Failed to connect the visual editor.',
      });
    }
  });
};