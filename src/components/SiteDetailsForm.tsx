import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserStore } from '@/store/userStore';
import { useCreateSite } from '@/hooks/useSiteCreation';
import { ArrowLeft, Sparkles, Palette, Github, Sun, Moon, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function SiteDetailsForm() {
  const { siteDetails, setSiteDetails, setCurrentStep } = useUserStore();
  const createSite = useCreateSite();
  
  const [localDetails, setLocalDetails] = useState({
    name: siteDetails.name || '',
    description: siteDetails.description || '',
    theme: siteDetails.theme,
    codeRepo: siteDetails.codeRepo || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setLocalDetails(prev => ({ ...prev, [field]: value }));
    setSiteDetails({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createSite.mutate({
      spaces: siteDetails.selectedSpaces,
      name: localDetails.name || undefined,
      description: localDetails.description || undefined,
      theme: localDetails.theme,
      codeRepo: localDetails.codeRepo || undefined,
    });
  };

  const selectedSpacesCount = siteDetails.selectedSpaces.length;

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, color: 'from-yellow-400 to-green-400' },
    { value: 'dark', label: 'Dark', icon: Moon, color: 'from-gray-600 to-gray-800' },
    { value: 'custom', label: 'Custom', icon: Wand2, color: 'from-green-500 to-pink-500' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary">Site Details</h2>
        <p className="text-muted-foreground text-lg">
          Customize your AI-powered site with <span className="text-green-600 font-semibold">{selectedSpacesCount}</span> selected space{selectedSpacesCount > 1 ? 's' : ''}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-pink-500 rounded-full mx-auto"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="card-glass border-green-200/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-500" />
              </div>
              <span>Site Configuration</span>
            </CardTitle>
            <CardDescription className="text-lg">
              These details will help us create the perfect site for your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Site Name */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <Label htmlFor="name" className="text-base font-medium">Site Name (Optional)</Label>
                <Input
                  id="name"
                  placeholder="My Amazing Site"
                  value={localDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-green-200/40 focus:border-green-400 focus:ring-green-400/20"
                />
                <p className="text-sm text-muted-foreground">
                  💡 If not provided, we'll generate one based on your content
                </p>
              </motion.div>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <Label htmlFor="description" className="text-base font-medium">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of what your site is about..."
                  value={localDetails.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="border-green-200/40 focus:border-green-400 focus:ring-green-400/20"
                />
              </motion.div>

              {/* Theme Selection */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <Label className="flex items-center space-x-2 text-base font-medium">
                  <Palette className="h-5 w-5 text-green-500" />
                  <span>Theme Preference</span>
                </Label>
                <RadioGroup
                  value={localDetails.theme}
                  onValueChange={(value) => handleInputChange('theme', value)}
                  className="grid grid-cols-3 gap-4"
                >
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all bg-white/80 dark:bg-gray-900/80 ${
                          localDetails.theme === option.value
                            ? 'border-green-400 bg-green-50/80 dark:bg-green-950/40'
                            : 'border-green-200/30 hover:border-green-300/50 hover:bg-green-50/40'
                        }`}
                      >
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.value} 
                          className="absolute top-3 right-3 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label htmlFor={option.value} className="cursor-pointer space-y-3">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-center font-medium">{option.label}</div>
                        </Label>
                      </motion.div>
                    );
                  })}
                </RadioGroup>
              </motion.div>

              {/* Code Repository */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Label htmlFor="codeRepo" className="flex items-center space-x-2 text-base font-medium">
                  <Github className="h-5 w-5 text-green-500" />
                  <span>Code Repository (Optional)</span>
                </Label>
                <Input
                  id="codeRepo"
                  placeholder="https://github.com/username/repo"
                  value={localDetails.codeRepo}
                  onChange={(e) => handleInputChange('codeRepo', e.target.value)}
                  className="border-green-200/40 focus:border-green-400 focus:ring-green-400/20"
                />
                <p className="text-sm text-muted-foreground">
                  🔗 Link to your code repository for enhanced AI understanding
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between pt-6"
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep('spaces')}
                  className="border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Spaces
                </Button>
                
                <Button
                  type="submit"
                  disabled={createSite.isPending}
                  className="min-w-[180px] bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  size="lg"
                >
                  {createSite.isPending ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Site
                      <Sparkles className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}