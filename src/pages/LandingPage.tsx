import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConnectDialog } from '@/components/ConnectDialog';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Globe, Wand2, Palette, Rocket } from 'lucide-react';

export function LandingPage() {
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Transform your Storyblok content into beautiful websites automatically",
      color: "text-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate and deploy your site in minutes, not hours",
      color: "text-yellow-500"
    },
    {
      icon: Globe,
      title: "Production Ready",
      description: "SEO optimized, responsive, and ready for the world",
      color: "text-blue-500"
    },
    {
      icon: Wand2,
      title: "Visual Editor",
      description: "Connect to live editing with instant visual feedback",
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden animated-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 4 === 0 ? 'bg-purple-400/30' :
              i % 4 === 1 ? 'bg-blue-400/30' :
              i % 4 === 2 ? 'bg-green-400/30' : 'bg-yellow-400/30'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full glass-effect animate-pulse-glow"
            >
              <Sparkles className="h-16 w-16 text-purple-500" />
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="gradient-text-primary">Storyblok AI</span>
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Site Generator
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your Storyblok spaces into stunning, AI-powered websites in minutes. 
            <span className="text-purple-600 font-semibold"> No coding required</span>, just pure magic. ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            onClick={() => setConnectDialogOpen(true)}
            className="text-xl px-12 py-8 hover:scale-105 transition-all duration-300 gradient-bg-primary shadow-2xl hover:shadow-purple-500/25 border-0"
          >
            <Rocket className="mr-3 h-6 w-6" />
            Connect Storyblok Account
          </Button>
          
          <p className="text-sm text-muted-foreground">
            🚀 Get started in under 2 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center space-y-4 p-8 rounded-2xl glass-effect hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex justify-center">
                  <div className={`p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional visual elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center space-x-8 pt-8"
        >
          {[Palette, Globe, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="p-3 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 glass-effect"
            >
              <Icon className={`h-6 w-6 ${
                i === 0 ? 'text-purple-400' :
                i === 1 ? 'text-blue-400' : 'text-yellow-400'
              }`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ConnectDialog 
        open={connectDialogOpen} 
        onOpenChange={setConnectDialogOpen} 
      />
    </div>
  );
}