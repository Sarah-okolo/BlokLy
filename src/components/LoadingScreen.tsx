import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Globe, Puzzle, Palette } from 'lucide-react';

const loadingMessages = [
  { icon: Puzzle, text: "Coupling your blocks...", color: "text-green-500" },
  { icon: Wand2, text: "Weaving your story...", color: "text-pink-500" },
  { icon: Palette, text: "Painting your vision...", color: "text-green-500" },
  { icon: Globe, text: "Deploying your magic...", color: "text-yellow-500" },
  { icon: Sparkles, text: "Adding the final touches...", color: "text-pink-500" },
];

export function LoadingScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = loadingMessages[currentMessageIndex];
  const Icon = currentMessage.icon;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-12 animated-gradient">
      {/* Main loading animation */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-32 h-32 border-4 border-green-200/30 border-t-green-500 border-r-pink-500 rounded-full" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [-360, 0]
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 4, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="p-4 bg-gradient-to-br from-green-500/20 to-pink-500/20 rounded-full glass-effect">
            <Sparkles className="h-12 w-12 text-green-500" />
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="text-center space-y-6 max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold gradient-text-primary"
        >
          Creating Your Site
        </motion.h2>
        
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-3 text-xl"
        >
          <div className={`p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl glass-effect`}>
            <Icon className={`h-6 w-6 ${currentMessage.color}`} />
          </div>
          <span className="font-medium">{currentMessage.text}</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          Our AI is analyzing your Storyblok content and creating a beautiful, 
          responsive website. This usually takes 1-2 minutes. ⏰
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg space-y-3">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden glass-effect">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-pink-500 to-green-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 80, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>🚀 Starting</span>
          <span>🎨 Processing</span>
          <span>✨ Finishing</span>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-green-400/40' :
              i % 3 === 1 ? 'bg-pink-400/40' : 'bg-green-400/40'
            }`}
            animate={{
              x: [0, 200, 0],
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.2,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}