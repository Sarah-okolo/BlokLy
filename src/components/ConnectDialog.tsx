import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useValidateToken } from '@/hooks/useAuth';
import { Loader2, Key, ExternalLink, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectDialog({ open, onOpenChange }: ConnectDialogProps) {
  const [token, setToken] = useState('');
  const validateToken = useValidateToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      validateToken.mutate(token.trim());
    }
  };

  const handleSuccess = () => {
    onOpenChange(false);
    setToken('');
  };

  // Close dialog when validation is successful
  if (validateToken.isSuccess) {
    setTimeout(handleSuccess, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] dialog-glass border-purple-200/30 shadow-2xl">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
              <Key className="h-6 w-6 text-purple-500" />
            </div>
            <span className="gradient-text-primary">Connect Your Storyblok Account</span>
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Enter your Personal Access Token to get started. Make sure it's a non-preview token with proper permissions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Label htmlFor="token" className="text-base font-medium">Personal Access Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="Enter your Storyblok PAT..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={validateToken.isPending}
              className="border-purple-200/40 focus:border-purple-400 focus:ring-purple-400/20 text-base py-3"
            />
            
            <div className="flex items-start space-x-2 p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-lg border border-blue-200/30">
              <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">Don't have a token?</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={() => window.open('https://app.storyblok.com/#!/me/account?tab=token', '_blank')}
                  type="button"
                >
                  Create one here
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          <DialogFooter className="space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={validateToken.isPending}
              className="border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!token.trim() || validateToken.isPending}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              {validateToken.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Connect Account
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}