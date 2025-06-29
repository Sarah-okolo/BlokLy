import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';
import { useConnectEditor } from '@/hooks/useSiteCreation';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Wand2, 
  Globe,
  Sparkles,
  Share2,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function SiteSuccessScreen() {
  const { createdSite, resetFlow } = useUserStore();
  const connectEditor = useConnectEditor();
  const [copied, setCopied] = useState(false);

  if (!createdSite) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(createdSite.url);
      setCopied(true);
      toast.success('URL copied to clipboard! 📋');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const handleConnectEditor = () => {
    connectEditor.mutate(createdSite.id);
  };

  const nextSteps = [
    {
      icon: Sparkles,
      title: "Your site is already optimized with AI",
      description: "SEO, performance, and responsive design are all handled automatically",
      color: "text-green-500"
    },
    {
      icon: Wand2,
      title: "Connect the Visual Editor",
      description: "Make real-time edits and see changes instantly on your live site",
      color: "text-pink-500"
    },
    {
      icon: Share2,
      title: "Share with your audience",
      description: "Your site is mobile-friendly and ready to be shared",
      color: "text-green-500"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full glass-effect animate-pulse-glow">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
        </motion.div>
        
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary">
            🎉 Site Created Successfully!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your AI-powered website is now live and ready to share with the world
          </p>
        </div>
      </motion.div>

      {/* Site Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="card-glass border-green-200/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-lg">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <span>{createdSite.name}</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Your new website is live and accessible to the world 🌍
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URL Display */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50/80 to-pink-50/80 dark:from-green-950/40 dark:to-pink-950/40 rounded-xl border border-green-200/30">
              <span className="flex-1 font-mono text-sm break-all">{createdSite.url}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUrl}
                className="flex items-center space-x-2 border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="grid gap-4 md:grid-cols-2">
              <Button
                onClick={() => window.open(createdSite.url, '_blank')}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                size="lg"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Live Site</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleConnectEditor}
                disabled={connectEditor.isPending}
                className="flex items-center space-x-2 border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
                size="lg"
              >
                {connectEditor.isPending ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Wand2 className="h-5 w-5" />
                )}
                <span>Connect Visual Editor</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What's Next Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="card-glass border-green-200/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-500" />
              </div>
              <span>What's Next?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 glass-effect"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-5 w-5 ${step.color}`} />
                      <p className="font-semibold">{step.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Another Site Button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center pt-6"
      >
        <Button
          onClick={resetFlow}
          variant="outline"
          className="min-w-[250px] border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
          size="lg"
        >
          <Zap className="mr-2 h-5 w-5" />
          Create Another Site
        </Button>
      </motion.div>
    </div>
  );
}