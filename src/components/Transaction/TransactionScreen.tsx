import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, CreditCard, Users } from 'lucide-react';

interface TransactionScreenProps {
  onProceed: (details: TransactionDetails) => void;
  className?: string;
}

export interface TransactionDetails {
  amount: number;
  paymentMethodId: string;
  recipientAccount: string;
  notes?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  details: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'pm_savings_123', name: 'Savings Account', details: 'Balance: $8,250.75' },
  { id: 'pm_checking_456', name: 'Checking Account', details: 'Balance: $1,500.00' },
  { id: 'pm_creditcard_789', name: 'Visa **** 1234', details: 'Available: $5,000.00' },
];

const TransactionScreen: React.FC<TransactionScreenProps> = ({ onProceed, className }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethodId, setPaymentMethodId] = useState<string>(paymentMethods[0]?.id || '');
  const [recipientAccount, setRecipientAccount] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ amount?: string; recipientAccount?: string }>({});

  const validate = useCallback(() => {
    const newErrors: { amount?: string; recipientAccount?: string } = {};
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }
    if (!recipientAccount.trim()) {
      newErrors.recipientAccount = 'Please enter a recipient account.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [amount, recipientAccount]);

  const handleProceed = useCallback(() => {
    if (validate()) {
      onProceed({
        amount: parseFloat(amount),
        paymentMethodId,
        recipientAccount,
        notes
      });
    }
  }, [validate, onProceed, amount, paymentMethodId, recipientAccount, notes]);

  return (
    <div className={cn("p-4 bg-background min-h-screen flex flex-col justify-center", className)}>
      <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground text-center">Make a Payment</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Enter transaction details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 text-lg h-12 border-border focus:border-primary"
              />
            </div>
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-foreground">Payment Method</Label>
            <Select value={paymentMethodId} onValueChange={setPaymentMethodId}>
              <SelectTrigger id="paymentMethod" className="h-12 border-border focus:border-primary text-foreground">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                  <SelectValue placeholder="Select a payment method" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-popover-foreground">
                {paymentMethods.map(method => (
                  <SelectItem key={method.id} value={method.id} className="focus:bg-muted">
                    <div className="flex flex-col">
                      <span>{method.name}</span>
                      <span className="text-xs text-muted-foreground">{method.details}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientAccount" className="text-foreground">Recipient Account</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="recipientAccount"
                type="text"
                placeholder="Enter account number or email"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                className="pl-10 h-12 border-border focus:border-primary"
              />
            </div>
            {errors.recipientAccount && <p className="text-sm text-destructive">{errors.recipientAccount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Notes (Optional)</Label>
            <Input 
              id="notes"
              type="text"
              placeholder="E.g., For rent, gift, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-12 border-border focus:border-primary"
            />
          </div>

          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base mt-4"
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionScreen;
