import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { Sparkles, Plus } from 'lucide-react';

export function StickyHeader() {
  const { isConnected, resetFlow } = useUserStore();

  if (!isConnected) return null;

  return (
    <header className="sticky top-0 z-50 w-full px-10 border-b overflow-hidden border-green-200/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-xl">
            <Sparkles className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <span className="font-bold text-lg gradient-text-primary">BlokLy AI</span>
            <div className="text-xs text-muted-foreground">Site Generator</div>
          </div>
        </div>
        
        <Button 
          onClick={resetFlow}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 border-0 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Site</span>
        </Button>
      </div>
    </header>
  );
}