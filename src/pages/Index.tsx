import React, { useState, useCallback } from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import { HeaderProps } from '@/components/layout/Header';
import { FooterNavItem } from '@/components/layout/Footer';

// Organism Components
import LandingScreen from '@/components/LandingScreen/LandingScreen';
import FeatureSelectionScreen from '@/components/FeatureSelection/FeatureSelectionScreen';
import AccountSummary from '@/components/AccountSummary/AccountSummary';
import TransactionScreen, { TransactionDetails } from '@/components/Transaction/TransactionScreen';
import TransactionStatus, { TransactionStatusDetails } from '@/components/Transaction/TransactionStatus';
import SettingsScreen from '@/components/Settings/SettingsScreen';

// Icons for Footer
import { Home as HomeIcon, ArrowRightLeft as TransferIcon, Settings as SettingsIcon } from 'lucide-react';

// Define the different screens in the application
_Screen;

enum Screen {
  Landing = 'LANDING',
  FeatureSelection = 'FEATURE_SELECTION',
  AccountSummary = 'ACCOUNT_SUMMARY',
  Transaction = 'TRANSACTION',
  TransactionStatus = 'TRANSACTION_STATUS',
  Settings = 'SETTINGS',
}

// Mock User Data for SettingsScreen
const MOCK_USER_DATA = {
  userName: "Alex Thompson",
  userEmail: "alex.thompson@bankease.com",
  userAvatarUrl: undefined, // No specific avatar, initials will be used
  memberSince: "July 2023",
};

const IndexPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Landing);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastTransactionDetails, setLastTransactionDetails] = useState<TransactionDetails | null>(null);
  const [transactionResult, setTransactionResult] = useState<TransactionStatusDetails | null>(null);

  const handleGetStarted = useCallback(() => {
    setCurrentScreen(Screen.FeatureSelection);
  }, []);

  const handleFeatureSelectionNext = useCallback((features: string[]) => {
    setSelectedFeatures(features);
    // For this prototype, we'll navigate to AccountSummary. Features could be used to customize it.
    console.log('Selected features:', features);
    setCurrentScreen(Screen.AccountSummary);
  }, []);

  const handleTransactionProceed = useCallback((details: TransactionDetails) => {
    setLastTransactionDetails(details);
    // Simulate API call and set result
    // Show a processing state first for better UX
    setTransactionResult({
      status: 'processing' as const,
      message: 'Processing your payment...',
      transactionId: `TEMP-${Date.now()}`,
      amount: details.amount,
      currency: '$', // Assuming USD for mock
      date: new Date(),
    });
    setCurrentScreen(Screen.TransactionStatus);

    const MOCK_API_DELAY = 2000; // Simulate network latency
    setTimeout(() => {
      const success = Math.random() > 0.2; // Simulate 80% success rate
      if (success) {
        setTransactionResult({
          status: 'success' as const,
          message: 'Payment Successful!',
          transactionId: `TXN${Date.now()}`,
          amount: details.amount,
          currency: '$',
          recipientName: `Account ${details.recipientAccount.slice(0, 4)}...${details.recipientAccount.slice(-4)}`,
          accountName: 'Savings Account XXXX',
          date: new Date(),
        });
      } else {
        setTransactionResult({
          status: 'failed' as const,
          message: 'Payment Failed',
          transactionId: `TXN_FAIL_${Date.now()}`,
          amount: details.amount,
          currency: '$',
          date: new Date(),
          // You could add error codes or specific failure reasons here
        });
      }
    }, MOCK_API_DELAY);
  }, []);

  const handleLogout = useCallback(() => {
    // Reset any sensitive state if necessary
    setSelectedFeatures([]);
    setLastTransactionDetails(null);
    setTransactionResult(null);
    setCurrentScreen(Screen.Landing);
  }, []);

  const handleFooterNav = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  // Determine Header and Footer visibility and props based on currentScreen
  let showHeader = true;
  let showFooter = true;
  let headerProps: Omit<HeaderProps, 'ref'> = {};
  let footerActiveItemId: string | undefined = undefined;

  switch (currentScreen) {
    case Screen.Landing:
      showHeader = false;
      showFooter = false;
      break;
    case Screen.FeatureSelection:
      showFooter = false; // FeatureSelectionScreen has its own "Next" button
      headerProps = {
        title: "Choose Features",
        showBackButton: true,
        onBack: () => setCurrentScreen(Screen.Landing),
      };
      break;
    case Screen.AccountSummary:
      headerProps = {
        // Uses default BankEase logo and title from Header component if title is undefined
        showBackButton: false,
      };
      footerActiveItemId = Screen.AccountSummary;
      break;
    case Screen.Transaction:
      headerProps = {
        title: "Make a Payment",
        showBackButton: true,
        onBack: () => setCurrentScreen(Screen.AccountSummary),
      };
      footerActiveItemId = Screen.Transaction;
      break;
    case Screen.TransactionStatus:
      showFooter = false; // TransactionStatus has its own primary actions
      headerProps = {
        title: "Transaction Status",
        showBackButton: true, 
        onBack: () => setCurrentScreen(Screen.AccountSummary), // Or to TransactionScreen if an edit flow was desired
      };
      break;
    case Screen.Settings:
      headerProps = {
        title: "Settings",
        showBackButton: true,
        onBack: () => setCurrentScreen(Screen.AccountSummary),
      };
      footerActiveItemId = Screen.Settings;
      break;
  }

  const appFooterNavItems: FooterNavItem[] = [
    { id: Screen.AccountSummary, label: 'Home', icon: HomeIcon, onClick: () => handleFooterNav(Screen.AccountSummary) },
    { id: Screen.Transaction, label: 'Transfer', icon: TransferIcon, onClick: () => handleFooterNav(Screen.Transaction) },
    { id: Screen.Settings, label: 'Settings', icon: SettingsIcon, onClick: () => handleFooterNav(Screen.Settings) },
  ];

  const renderScreen = () => {
    // The individual screen components manage their own padding and layout internally.
    // MainAppLayout provides the overall header/footer structure and a content area.
    // The `p-4` in MainAppLayout's child wrapper will apply to these screens.
    switch (currentScreen) {
      case Screen.Landing:
        // LandingScreen is designed to be full-page; MainAppLayout's internal p-4 might affect this.
        // Forcing it to be rendered within the layout as per requirements.
        return <LandingScreen onGetStarted={handleGetStarted} />;
      case Screen.FeatureSelection:
        return <FeatureSelectionScreen onNext={handleFeatureSelectionNext} />;
      case Screen.AccountSummary:
        return <AccountSummary 
          onNavigateToTransactionHistory={() => alert("Transaction history clicked!")} // Placeholder action
          onNavigateToCardDetails={(cardId) => alert(`Card details for ${cardId} clicked!`)} // Placeholder action
        />;
      case Screen.Transaction:
        return <TransactionScreen onProceed={handleTransactionProceed} />;
      case Screen.TransactionStatus:
        if (!transactionResult) {
          // This state should ideally be brief or handled by showing a generic loading/error message.
          // For this prototype, if somehow reached without a result, show a simple message.
          return <div className="flex items-center justify-center h-full text-muted-foreground">Loading transaction status...</div>;
        }
        return <TransactionStatus 
          details={transactionResult}
          onGoHome={() => setCurrentScreen(Screen.AccountSummary)}
          onContactSupport={() => alert("Contact support clicked!")} // Placeholder action
          onViewHistory={() => alert("View history clicked!")}    // Placeholder action
          onShareReceipt={() => alert("Share receipt clicked!")}  // Placeholder action
        />;
      case Screen.Settings:
        return <SettingsScreen 
          {...MOCK_USER_DATA}
          onLogout={handleLogout}
          onUpgradePlan={() => alert("Upgrade plan clicked!")} // Placeholder action
        />;
      default:
        // Fallback to LandingScreen if currentScreen is an unknown state
        return <LandingScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <MainAppLayout
      showHeader={showHeader}
      showFooter={showFooter}
      headerProps={headerProps}
      footerProps={{
        navItems: appFooterNavItems,
        activeItemId: footerActiveItemId,
      }}
    >
      {renderScreen()}
    </MainAppLayout>
  );
};

export default IndexPage;
