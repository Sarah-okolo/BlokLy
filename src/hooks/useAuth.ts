import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axiosInstance';
import { useUserStore } from '@/store/userStore';
import { toast } from 'sonner';

interface ValidationResponse {
  valid: boolean;
  user: {
    id: string;
    email: string;
  };
}

export const useValidateToken = () => {
  const { setConnected, setCurrentStep } = useUserStore();
  
  return useMutation({
    mutationFn: async (pat: string) => {
      const response = await axiosInstance.post<ValidationResponse>('/connect', { pat });
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        setConnected(true);
        setCurrentStep('spaces');
        toast.success('🎉 Connected successfully!', {
          description: 'Your Storyblok account is now connected.',
        });
      }
    },
    onError: (error: any) => {
      toast.error('❌ Connection failed', {
        description: error.response?.data?.message || 'Invalid token. Please check your Personal Access Token.',
      });
    }
  });
};

export const useFetchSpaces = () => {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      const response = await axiosInstance.get('/spaces');
      return response.data;
    },
    enabled: false, // Only fetch when explicitly called
  });
};