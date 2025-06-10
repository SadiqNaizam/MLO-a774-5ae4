import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Header, { HeaderProps } from './Header';
import Footer, { FooterProps, FooterNavItem, defaultFooterNavItems as defaultItems } from './Footer';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;

  // Header related props
  showHeader?: boolean;
  headerProps?: Omit<HeaderProps, 'ref'>; // Pass all HeaderProps except ref

  // Footer related props
  showFooter?: boolean;
  footerProps?: FooterProps;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  showHeader = true,
  headerProps,
  showFooter = true,
  footerProps,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (showHeader && headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    // A ResizeObserver could be used here for more dynamic header height changes
  }, [showHeader, headerProps?.title, headerProps?.actions, headerProps?.showBackButton]);

  const actualFooterProps = {
    navItems: defaultItems, // Default items if not provided
    ...footerProps,
  };

  // Standard height for bottom navigation bar (h-16 = 4rem = 64px)
  const footerHeightPx = showFooter ? 64 : 0;

  return (
    <div className={cn("flex flex-col min-h-screen bg-background", className)}>
      {showHeader && (
        <Header ref={headerRef} {...headerProps} />
      )}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          paddingTop: showHeader ? `${headerHeight}px` : '0px',
          paddingBottom: `${footerHeightPx}px`,
        }}
      >
        <div className="p-4 h-full">
          {children}
        </div>
      </main>
      {showFooter && (
        <Footer {...actualFooterProps} />
      )}
    </div>
  );
};

export default MainAppLayout;
