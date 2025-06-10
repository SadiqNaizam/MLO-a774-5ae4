import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle2, Languages, BellRing, Settings2 as AppSettingsIcon, LifeBuoy, LogOut, Award, ChevronRight, CreditCard } from 'lucide-react';

interface SettingsItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action?: () => void;
  href?: string;
}

const settingsItems: SettingsItem[] = [
  { id: 'account', label: 'Account Details', icon: UserCircle2, action: () => console.log('Navigate to Account Details') },
  { id: 'language', label: 'Preferred Language', icon: Languages, action: () => console.log('Navigate to Language Settings') },
  { id: 'notifications', label: 'Transaction Alerts', icon: BellRing, action: () => console.log('Navigate to Notification Settings') },
  { id: 'preferences', label: 'App Preferences', icon: AppSettingsIcon, action: () => console.log('Navigate to App Preferences') },
  { id: 'payment_methods', label: 'Payment Methods', icon: CreditCard, action: () => console.log('Navigate to Payment Methods') },
  { id: 'support', label: 'Customer Service', icon: LifeBuoy, action: () => console.log('Navigate to Customer Service') },
];

interface SettingsScreenProps {
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  memberSince: string;
  onLogout: () => void;
  onUpgradePlan?: () => void;
  className?: string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userName,
  userEmail,
  userAvatarUrl,
  memberSince,
  onLogout,
  onUpgradePlan,
  className,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={cn("p-4 bg-background min-h-screen", className)}>
      <Card className="mb-6 bg-card shadow-md">
        <CardContent className="p-6 flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={userName} />}
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{userName}</h2>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
            <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
          </div>
        </CardContent>
      </Card>

      {onUpgradePlan && (
         <Card className="mb-6 bg-accent-secondary/10 border-accent-secondary shadow-md hover:shadow-lg transition-shadow">
          <Button 
            variant="ghost" 
            className="w-full h-auto p-4 flex items-center justify-between text-left text-accent-secondary font-semibold" 
            onClick={onUpgradePlan}
          >
            <div className="flex items-center">
              <Award className="mr-3 h-6 w-6 text-accent-secondary" />
              <div>
                <span className="block text-md">Upgrade Plan</span>
                <span className="block text-xs font-normal text-accent-secondary/80">Unlock premium features and benefits.</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </Card>
      )}

      <Card className="bg-card shadow-md">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {settingsItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 h-auto text-left hover:bg-muted/50 rounded-none first:rounded-t-lg last:rounded-b-lg"
                    onClick={item.action}
                    asChild={!!item.href}
                  >
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                          <ItemIcon className="mr-3 h-5 w-5 text-primary" />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </a>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <ItemIcon className="mr-3 h-5 w-5 text-primary" />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button 
          variant="destructive" 
          className="w-full h-12 text-base"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-5 w-5" /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
