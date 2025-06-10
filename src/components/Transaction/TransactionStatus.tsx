import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Loader2, XCircle, AlertCircle, HelpCircle, History, Share2 } from 'lucide-react';

export interface TransactionStatusDetails {
  status: 'processing' | 'success' | 'failed' | 'pending';
  message: string;
  transactionId?: string;
  amount?: number;
  currency?: string;
  recipientName?: string;
  accountName?: string;
  date?: Date;
}

interface TransactionStatusProps {
  details: TransactionStatusDetails;
  onContactSupport?: () => void;
  onViewHistory?: () => void;
  onShareReceipt?: () => void;
  onGoHome?: () => void;
  className?: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  details,
  onContactSupport,
  onViewHistory,
  onShareReceipt,
  onGoHome,
  className,
}) => {
  const getStatusIcon = () => {
    switch (details.status) {
      case 'success' as const:
        return <CheckCircle2 size={64} className="text-success" />;
      case 'processing' as const:
        return <Loader2 size={64} className="text-primary animate-spin" />;
      case 'pending' as const:
        return <AlertCircle size={64} className="text-yellow-500" />;
      case 'failed' as const:
        return <XCircle size={64} className="text-destructive" />;
      default:
        return <AlertCircle size={64} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (details.status) {
      case 'success' as const: return 'text-success';
      case 'processing' as const: return 'text-primary';
      case 'pending' as const: return 'text-yellow-500';
      case 'failed' as const: return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn("p-4 bg-background min-h-screen flex flex-col items-center justify-center text-center", className)}>
      <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
        <CardHeader className="items-center">
          <div className="mb-6 p-4 bg-muted rounded-full">
            {getStatusIcon()}
          </div>
          <CardTitle className={cn("text-2xl font-semibold", getStatusColor())}>{details.message}</CardTitle>
          {details.transactionId && (
            <CardDescription className="text-muted-foreground">Transaction ID: {details.transactionId}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {(details.amount || details.recipientName || details.accountName || details.date) && (
            <div className="space-y-3 text-sm border-t border-b border-border py-4">
              {details.amount && details.currency && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">{details.currency}{details.amount.toFixed(2)}</span>
                </div>
              )}
              {details.recipientName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium text-foreground">{details.recipientName}</span>
                </div>
              )}
              {details.accountName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <span className="font-medium text-foreground">{details.accountName}</span>
                </div>
              )}
              {details.date && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium text-foreground">{details.date.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onContactSupport && (
              <Button variant="outline" onClick={onContactSupport} className="border-border hover:bg-muted/50 text-foreground">
                <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
              </Button>
            )}
            {onViewHistory && (
              <Button variant="outline" onClick={onViewHistory} className="border-border hover:bg-muted/50 text-foreground">
                <History className="mr-2 h-4 w-4" /> View History
              </Button>
            )}
            {onShareReceipt && details.status === 'success' && (
              <Button variant="outline" onClick={onShareReceipt} className="border-border hover:bg-muted/50 text-foreground sm:col-span-2">
                <Share2 className="mr-2 h-4 w-4" /> Share Receipt
              </Button>
            )}
          </div>

          {onGoHome && (
            <Button onClick={onGoHome} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
              Back to Home
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStatus;
