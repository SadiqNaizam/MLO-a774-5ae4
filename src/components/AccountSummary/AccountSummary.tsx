import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, ArrowDownCircle, CreditCard as CreditCardIcon, ChevronRight, TrendingUp as TrendingUpIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface AccountSummaryProps {
  className?: string;
  onNavigateToCardDetails?: (cardId: string) => void;
  onNavigateToTransactionHistory?: () => void;
}

interface PaymentCardData {
  id: string;
  name: string;
  last4: string;
  type: 'Business' | 'Personal';
  icon: React.ElementType;
}

interface TransactionData {
  id: string;
  name: string;
  avatarInitial: string;
  avatarUrl?: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

const balanceChartData = [
  { name: 'Jan', balance: 2500 },
  { name: 'Feb', balance: 2800 },
  { name: 'Mar', balance: 2200 },
  { name: 'Apr', balance: 3100 },
  { name: 'May', balance: 3500 },
  { name: 'Jun', balance: 4200 },
  { name: 'Jul', balance: 3800 },
  { name: 'Aug', balance: 5100 },
  { name: 'Sep', balance: 4500 },
  { name: 'Oct', balance: 6250.75 },
  { name: 'Nov', balance: 7800 },
  { name: 'Dec', balance: 8250.75 },
];

const paymentCardsData: PaymentCardData[] = [
  { id: 'card1', name: 'Business Card', last4: '1234', type: 'Business' as const, icon: CreditCardIcon },
  { id: 'card2', name: 'Personal Card', last4: '5678', type: 'Personal' as const, icon: CreditCardIcon },
];

const recentTransactionsData: TransactionData[] = [
  { id: 'tx1', name: 'Salary Deposit', avatarInitial: 'SD', amount: 3500.00, type: 'income' as const, date: '2024-07-28' },
  { id: 'tx2', name: 'Grocery Store', avatarInitial: 'GS', amount: -75.50, type: 'expense' as const, date: '2024-07-27' },
  { id: 'tx3', name: 'John Doe', avatarInitial: 'JD', amount: 120.00, type: 'income' as const, date: '2024-07-26' },
  { id: 'tx4', name: 'Utility Bill', avatarInitial: 'UB', amount: -150.20, type: 'expense' as const, date: '2024-07-25' },
  { id: 'tx5', name: 'Freelance Payment', avatarInitial: 'FP', amount: 500.00, type: 'income' as const, date: '2024-07-24' },
];

const AccountSummary: React.FC<AccountSummaryProps> = ({ className, onNavigateToCardDetails, onNavigateToTransactionHistory }) => {
  const currentBalance = 8250.75;

  return (
    <div className={cn("p-4 space-y-6 bg-background min-h-screen", className)}>
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Available Balance</CardTitle>
          <CardDescription className="text-muted-foreground">As of today</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary mb-2">${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceChartData} margin={{ top: 5, right: 0, left: -30, bottom: 5 }}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 500', 'dataMax + 500']}/>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}} 
                  labelStyle={{ color: 'hsl(var(--popover-foreground))'}}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#balanceGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Payment Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentCardsData.map((card) => {
            const CardIcon = card.icon;
            return (
              <Button
                key={card.id}
                variant="outline"
                className="w-full flex justify-between items-center p-4 h-auto bg-background hover:bg-muted/50 border-border"
                onClick={() => onNavigateToCardDetails && onNavigateToCardDetails(card.id)}
              >
                <div className="flex items-center space-x-3">
                  <CardIcon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-left">{card.name}</p>
                    <p className="text-sm text-muted-foreground text-left">**** **** **** {card.last4}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <Card className="bg-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-foreground">Recent Transactions</CardTitle>
          <Button variant="link" size="sm" className="text-primary px-0" onClick={onNavigateToTransactionHistory}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentTransactionsData.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between pb-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    {tx.avatarUrl && <AvatarImage src={tx.avatarUrl} alt={tx.name} />}
                    <AvatarFallback className={cn(tx.type === 'income' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive')}>{tx.avatarInitial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {tx.type === 'income' ? (
                    <ArrowUpCircle className="w-5 h-5 text-success" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-destructive" />
                  )}
                  <span className={cn("font-semibold", tx.type === 'income' ? 'text-success' : 'text-destructive')}>
                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSummary;
