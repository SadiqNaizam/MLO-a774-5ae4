import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CreditCard, TrendingUp, Shield, Repeat, Smartphone, Landmark, PiggyBank, Send, FileText, Settings2, AlertTriangle, HelpCircle } from 'lucide-react';

interface Feature {
  id: string;
  label: string;
  icon: React.ElementType;
}

const featuresData: Feature[] = [
  { id: 'payments', label: 'Payment', icon: CreditCard },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'transfers', label: 'Transfers', icon: Send },
  { id: 'investments', label: 'Invest', icon: TrendingUp },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'recurring', label: 'Recurring', icon: Repeat },
  { id: 'mobile_banking', label: 'Mobile Top-up', icon: Smartphone },
  { id: 'loans', label: 'Loans', icon: Landmark },
  { id: 'statements', label: 'Statements', icon: FileText },
  { id: 'limits', label: 'Limits', icon: AlertTriangle },
  { id: 'settings', label: 'Preferences', icon: Settings2 },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

interface FeatureSelectionScreenProps {
  onNext: (selectedFeatures: string[]) => void;
  className?: string;
}

const FeatureSelectionScreen: React.FC<FeatureSelectionScreenProps> = ({ onNext, className }) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleSelectionChange = useCallback((value: string[]) => {
    setSelectedFeatures(value);
  }, []);

  const handleNextClick = useCallback(() => {
    onNext(selectedFeatures);
  }, [onNext, selectedFeatures]);

  return (
    <div className={cn("p-4 space-y-6 bg-background min-h-screen flex flex-col", className)}>
      <h2 className="text-2xl font-semibold text-foreground text-center">Choose your banking features</h2>
      
      <ToggleGroup 
        type="multiple"
        value={selectedFeatures}
        onValueChange={handleSelectionChange}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-grow"
      >
        {featuresData.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <ToggleGroupItem 
              key={feature.id} 
              value={feature.id} 
              aria-label={feature.label}
              className="flex flex-col items-center justify-center h-28 p-2 border data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary hover:bg-muted/50 transition-all duration-150 ease-in-out rounded-lg"
            >
              <IconComponent size={32} className="mb-2" />
              <span className="text-xs text-center font-medium">{feature.label}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      
      <div className="mt-auto pt-4">
        <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleNextClick}
            disabled={selectedFeatures.length === 0}
        >
            Next
        </Button>
      </div>
    </div>
  );
};

export default FeatureSelectionScreen;
