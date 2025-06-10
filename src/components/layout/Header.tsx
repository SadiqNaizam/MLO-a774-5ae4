import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bank } from 'lucide-react';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ title, showBackButton = false, onBack, actions, className }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background p-4 border-b border-border shadow-sm",
          className
        )}
      >
        <div className="flex items-center flex-1 min-w-0">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
              className="mr-2 flex-shrink-0 h-9 w-9 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {title ? (
            <h1 className="text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
          ) : (
            <div className="flex items-center space-x-2">
              <Bank className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-semibold text-lg text-foreground">BankEase</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {actions}
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;
