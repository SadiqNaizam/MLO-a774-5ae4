import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, Settings2 } from 'lucide-react'; // Example icons

export interface FooterNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: (id: string) => void;
  disabled?: boolean;
}

export interface FooterProps {
  navItems?: FooterNavItem[];
  activeItemId?: string;
  onNavigate?: (item: FooterNavItem) => void;
  className?: string;
}

export const defaultFooterNavItems: FooterNavItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings2, href: '/settings' },
];

const Footer: React.FC<FooterProps> = ({
  navItems = defaultFooterNavItems,
  activeItemId,
  onNavigate,
  className,
}) => {
  const handleItemClick = (item: FooterNavItem) => {
    if (item.disabled) return;
    if (onNavigate) {
      onNavigate(item);
    } else if (item.onClick) {
      item.onClick(item.id);
    } else if (item.href) {
      // Basic navigation, in a real app, use react-router-dom or Next.js Link
      window.location.href = item.href;
    }
  };

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-background shadow-t-sm",
        className
      )}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.id === activeItemId;
        return (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-full w-full rounded-none px-1 py-2 text-xs",
              isActive ? "text-primary" : "text-muted-foreground",
              item.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50"
            )}
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            aria-current={isActive ? 'page' : undefined}
          >
            <IconComponent className={cn("h-5 w-5 mb-0.5", isActive ? "text-primary" : "")} />
            {item.label}
          </Button>
        );
      })}
    </footer>
  );
};

export default Footer;
