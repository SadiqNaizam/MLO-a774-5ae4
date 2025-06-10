import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bank, Rocket } from 'lucide-react'; // Using Bank or Rocket as a placeholder for illustration

interface LandingScreenProps {
  onGetStarted: () => void;
  className?: string;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center h-screen p-8 bg-background text-center", className)}>
      <div className="mb-8">
        {/* Placeholder for a welcoming illustration */}
        <Rocket size={128} className="text-primary mx-auto" /> 
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-3">BankEase</h1>
      <p className="text-lg text-muted-foreground mb-10">Your banking, simplified.</p>
      <Button 
        size="lg" 
        className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground" 
        onClick={onGetStarted}
      >
        Get Started
      </Button>
    </div>
  );
};

export default LandingScreen;
