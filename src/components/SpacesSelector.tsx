import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchSpaces } from '@/hooks/useAuth';
import { useUserStore } from '@/store/userStore';
import { Space } from '@/store/userStore';
import { ArrowRight, Globe, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function SpacesSelector() {
  const { userSpaces, setUserSpaces, siteDetails, setSiteDetails, setCurrentStep } = useUserStore();
  const { data: spaces, isLoading, isError, refetch } = useFetchSpaces();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (spaces) {
      setUserSpaces(spaces);
    }
  }, [spaces, setUserSpaces]);

  const handleSpaceToggle = (spaceData: Space, checked: boolean) => {
  const newSelectedSpaces = checked
    ? [...siteDetails.selectedSpaces, spaceData]
    : siteDetails.selectedSpaces.filter(s => s.id !== spaceData.id);

    setSiteDetails({ ...siteDetails, selectedSpaces: newSelectedSpaces });
  };


  const handleNext = () => {
    if (siteDetails.selectedSpaces.length === 0) {
      toast.error('Please select at least one space');
      return;
    }
    setCurrentStep('details');
  };

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold gradient-text-primary">Select Your Spaces</h2>
          <p className="text-muted-foreground text-lg">Loading your Storyblok spaces...</p>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-pink-500 rounded-full mx-auto animate-pulse"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="card-glass border-green-200/30">
              <CardHeader>
                <Skeleton className="h-5 w-3/4 bg-green-200/20" />
                <Skeleton className="h-4 w-1/2 bg-pink-200/20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2 bg-green-200/20" />
                <Skeleton className="h-4 w-2/3 bg-yellow-200/20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="p-6 bg-red-50/80 dark:bg-red-950/40 rounded-2xl border border-red-200/30">
          <h2 className="text-3xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600/80">Failed to load your spaces. Please try again.</p>
        </div>
        <Button 
          onClick={() => refetch()}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary">Select Your Spaces</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose the Storyblok spaces you want to include in your AI-powered site
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-pink-500 rounded-full mx-auto"></div>
      </motion.div>
      
      {userSpaces.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md mx-auto"
        >
          <div className="p-8 card-glass rounded-2xl border border-green-200/30">
            <Globe className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No spaces found in your account.</p>
            <Button 
              variant="outline"
              onClick={() => window.open('https://app.storyblok.com', '_blank')}
              className="border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
            >
              Create a space in Storyblok
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {userSpaces.map((space: Space, index) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 card-glass hover:shadow-xl border-2 ${
                    siteDetails.selectedSpaces.some(s => s.id === space.id) 
                      ? 'border-green-400 bg-green-50/80 dark:bg-green-950/40 shadow-lg shadow-green-500/20' 
                      : 'border-green-200/30 hover:border-green-300/50'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <CardTitle className="flex items-center space-x-3 text-lg group-hover:text-green-600 transition-colors">
                          <div className="p-2 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-lg">
                            <Globe className="h-4 w-4 text-green-500" />
                          </div>
                          <span>{space.name}</span>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {space.domain || 'No domain set'}
                        </CardDescription>
                      </div>
                      <Checkbox
                        checked={siteDetails.selectedSpaces.some(s => s.id === space.id)}
                        onCheckedChange={(checked) =>
                          handleSpaceToggle(space, checked as boolean)
                        }
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(space.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium capitalize text-green-600">{space.plan}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center space-y-4 pt-8"
          >
            <Button 
              onClick={handleNext}
              disabled={siteDetails.selectedSpaces.length === 0}
              size="lg"
              className="min-w-[250px] bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
            >
              Continue to Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {siteDetails.selectedSpaces.length > 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground bg-green-50/80 dark:bg-green-950/40 px-4 py-2 rounded-full border border-green-200/30"
              >
                ✨ {siteDetails.selectedSpaces.length} space{siteDetails.selectedSpaces.length > 1 ? 's' : ''} selected
              </motion.p>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}